import { PubSub } from 'graphql-subscriptions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import 'dotenv/config'
const JWT_SECRET = process.env.SECRET


const Categories = db.Categories
const Users = db.Users
const Exercises = db.Exercises
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
    },
    Mutation: {
        createUser: async (_, { name, email, password}) => {
            const existingUser = await Users.findOne({where:{email: email}});
            console.log(existingUser);
            
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                id: Users.length + 1,
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
            console.log(category);
            if(user.categories_completed.includes(categoryId)){
                throw new Error(`Already won the category with ID ${categoryId}`);
            }
            
            user.categories_completed.push(categoryId)
            user.total_points += category.points
            user.categories_completed = JSON.stringify(user.categories_completed)


            user.save()

            return user;
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator('USER_CREATED'),
        },
    },
};