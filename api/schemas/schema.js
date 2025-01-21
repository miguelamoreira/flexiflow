import { gql } from 'graphql-tag';

export const typeDefs = gql`
    enum Level {
        Beginner
        Intermediate
        Advanced
    }

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        title: String!
        total_points: Int!
        total_time_spent: Int!
        total_programs_completed: Int!
    }

    type Program {
        id: ID!
        name: String!
        description: String!
        category: Category!
        level: Level!
        points_required: Int!
    }

    type Exercise {
        id: ID!
        name: String!
        description: String
        image: String
        category: Category
    }

    type Category {
        id: ID!
        name: String!
        description: String
    }

    type ProgramExercise {
        id: ID!
        program: Program!
        exercise: Exercise!
        sequence_order: Int!
        repetitions: Int!
    }

    type ProgramCompletion {
        id: ID!
        user: User!
        program: Program!
        completion_date: String!
    }

    type DailyProgram {
        id: ID!
        user: User!
        date: String!
        points_earned: Int!
        time_spent: Int!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        programs: [Program!]!
        program(id: ID!): Program
        exercises: [Exercise!]!
        exercise(id: ID!): Exercise
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!, title: String!): User!
        login(email: String!, password: String!): String!
    }

    type Subscription {
        userCreated: User!
    }
`;