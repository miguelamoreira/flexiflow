import { PubSub } from 'graphql-subscriptions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pubsub = new PubSub();

let users = [];
let exercises = [];
let categories = [];

export const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => {
            const user = users.find(user => user.id === id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            return user;
        },
        exercises: () => exercises,
        exercise: (_, { id }) => {
            const exercise = exercises.find(exercise => exercise.id === id);
            if (!exercise) {
                throw new Error(`Exercise with ID ${id} not found`);
            }
            return exercise;
        },
        exercisesByCategoryID: (_, { id } ) => {
            const filteredExercises = exercises.filter(exercise => exercise.categoryId === id)
            if (!filteredExercises) {
                throw new Error(`Exercises with category ID ${id} not found`)
            }
            return filteredExercises
        },
        categories: () => categories,
        category: (_, { id }) => {
            const category = categories.find(category => category.id === id);
            if (!category) {
                throw new Error(`Category with ID ${id} not found`);
            }
            return category;
        },
    },
    Mutation: {
        createUser: async (_, { name, email, password }) => {
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: users.length + 1,
                name,
                email,
                password: hashedPassword,
                title: 'Beginner',
                total_points: 0,
                categories_completed: []
            };

            users.push(newUser);
            pubsub.publish('USER_CREATED', { userCreated: newUser });
            return newUser;
        },
        login: async (_, { email, password }) => {
            const user = users.find(user => user.email === email);
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
        completeCategory: (_, { userId, categoryId }) => {
            const user = users.find(user => user.id === userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            const category = categories.find(category => category.id === categoryId);
            if (!category) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }

            user.categories_completed.push(categoryId)
            user.total_points += category.points_rewarded

            return user;
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator('USER_CREATED'),
        },
    },
};