import { PubSub } from 'graphql-subscriptions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import 'dotenv/config'
const JWT_SECRET = process.env.SECRET


const Categories = db.Categories
const Users = db.Users
const Exercises = db.Exercises
const DailyChallenges = db.DailyChallenges
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        users: async () => await Users.findAll(),
        user: (_, { id }) => {
            const user = Users.findByPk(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            return user;
        },
        exercises:async  () => await Exercises.findAll(),
        exercise:async  (_, { id }) => {
            const exercise = await Exercises.findByPk(id);
            if (!exercise) {
                throw new Error(`Exercise with ID ${id} not found`);
            }
            return exercise;
        },
        exercisesByCategoryID:async (_, { id } ) => {
            const filteredExercises = await Exercises.findAll({where:{category_id: id}})
            if (!filteredExercises) {
                throw new Error(`Exercises with category ID ${id} not found`)
            }
            return filteredExercises
        },
        categories: async () => await Categories.findAll(),
        category: async (_, { id }) => {
            const category = await Categories.findByPk(id);
            if (!category) {
                throw new Error(`Category with ID ${id} not found`);
            }
            return category;
        },
        dailyChallenge: async () => {
          const today = new Date().toISOString().split("T")[0];
        
          let challenge = await DailyChallenges.findOne({ where: { date: today } });
        
          if (!challenge) {
            const exercises = await Exercises.findAll();
            if (!exercises || exercises.length === 0) {
              throw new Error("No exercises available to create a challenge");
            }
        
            const randomExercises = exercises
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((exercise) => exercise.id);
        
            challenge = await DailyChallenges.create({
              date: today,
              exercise_ids: randomExercises.join(","),  // Store as comma-separated string
              points: 5,
              users_id: null,
            });
          }
        
          // Split the exercise_ids string into an array
          const exerciseIds = challenge.exercise_ids.split(",");
          const exerciseDetails = await Exercises.findAll({
            where: {
              id: exerciseIds,
            },
          });
        
          return {
            id: challenge.id,
            date: challenge.date,
            exercises: exerciseDetails,  // Return exercise objects
            points: challenge.points,
            users: challenge.users,  // users is still a string, you can handle it as needed
          };
        },        
    },
    Mutation: {
        createUser: async (_, { name, email, password}) => {
            const existingUser = await Users.findOne({where:{email: email}});

            
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                name,
                email,
                password: hashedPassword,
                title: 'Beginner',
                total_points: 0,
                categories_completed: JSON.stringify([])
            });


            pubsub.publish('USER_CREATED', { userCreated: newUser });
            return newUser;
        },
        login: async (_, { email, password }) => {
            const user = await Users.findOne({where:{email:email}});
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            return token;
        },
        completeCategory:async (_, { userId, categoryId }) => {
            const user = await Users.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            user.categories_completed = JSON.parse(user.categories_completed)
            const category = await Categories.findByPk(categoryId);
            if (!category) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }

            if(user.categories_completed.includes(categoryId)){
                throw new Error(`Already won the category with ID ${categoryId}`);
            }
            
            user.categories_completed.push(categoryId)
            user.total_points += category.points
            user.categories_completed = JSON.stringify(user.categories_completed)


            user.save()

            return user;
        },
        createDailyChallenge: async (_, { date, points }) => {
            const existingChallenge = await DailyChallenges.findOne({
              where: { date },
            });
      
            if (existingChallenge) {
              throw new Error(`Daily challenge for date ${date} already exists.`);
            }
      
            const allExercises = await Exercises.findAll();
      
            if (!allExercises || allExercises.length === 0) {
              throw new Error("No exercises available to create a challenge.");
            }
      
            const randomExercises = allExercises
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((exercise) => exercise.id);
      
            const exerciseIdsString = JSON.stringify(randomExercises);
            const challenge = await DailyChallenges.create({
              date,
              exercise_ids: exerciseIdsString,
              points,
              users_id: "",
            });

            const exerciseDetails = await Exercises.findAll({
              where: { id: randomExercises },
            });
        
            return {
              date: challenge.date,
              exercises: exerciseDetails,
              points: challenge.points,
              users: challenge.users_id,
            };
        },        
        completeDailyChallenge: async (_, { userId }) => {
            const today = new Date().toISOString().split("T")[0];
            const challenge = await DailyChallenges.findOne({
              where: { date: today },
            });
      
            if (!challenge) {
              throw new Error("No daily challenge available for today.");
            }
    
            let users = challenge.users_id ? JSON.parse(challenge.users_id) : [];
      
            if (users.includes(userId)) {
              throw new Error("You have already completed today's challenge.");
            }
            users.push(Number(userId))
            challenge.users_id = JSON.stringify(users);
            await challenge.save();
      
            const user = await Users.findByPk(userId);
            if (!user) {
              throw new Error(`User with ID ${userId} not found.`);
            }
          
            user.total_points += challenge.points;
            await user.save();
      
            const usersDetails = await Users.findAll({
              where: {
                id: users,
              }
            });
          
            const exercises = await Exercises.findAll({
              where: { id: JSON.parse(challenge.exercise_ids) },
            });
          
            return {
              id: challenge.id,
              date: challenge.date,
              exercises,
              points: challenge.points,
              users: usersDetails,
            };
        }        
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterableIterator('USER_CREATED'),
        },
        dailyChallengeCreated: {
            subscribe: () => pubsub.asyncIterableIterator('DAILY_CHALLENGE_CREATED'),
        },
    },
};