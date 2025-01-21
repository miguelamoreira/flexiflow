import { PubSub } from 'graphql-subscriptions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pubsub = new PubSub();

let users = [];
let programs = [];
let exercises = [];
let categories = [];
let programCompletions = []; 

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
        programs: () => programs,
        program: (_, { id }) => {
            const program = programs.find(program => program.id === id);
            if (!program) {
                throw new Error(`Program with ID ${id} not found`);
            }
            return program;
        },
        exercises: () => exercises,
        exercise: (_, { id }) => {
            const exercise = exercises.find(exercise => exercise.id === id);
            if (!exercise) {
                throw new Error(`Exercise with ID ${id} not found`);
            }
            return exercise;
        },
        categories: () => categories,
        category: (_, { id }) => {
            const category = categories.find(category => category.id === id);
            if (!category) {
                throw new Error(`Category with ID ${id} not found`);
            }
            return category;
        },
        userPrograms: (_, { userId }) => {
            const userProgramCompletions = programCompletions.filter(
                completion => completion.user_id === userId
            );
            return userProgramCompletions.map(completion => {
                const program = programs.find(program => program.id === completion.program_id);
                return program;
            });
        },
        programCompletions: (_, { userId }) => {
            return programCompletions.filter(completion => completion.user_id === userId);
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
                total_time_spent: 0,
                total_programs_completed: 0,
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
        completeProgram: (_, { userId, programId }) => {
            const user = users.find(user => user.id === userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            const program = programs.find(program => program.id === programId);
            if (!program) {
                throw new Error(`Program with ID ${programId} not found`);
            }

            const newCompletion = {
                id: programCompletions.length + 1,
                user_id: userId,
                program_id: programId,
                completion_date: new Date().toISOString(),
            };

            programCompletions.push(newCompletion);

            user.total_programs_completed += 1;

            return newCompletion;
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator('USER_CREATED'),
        },
    },
};