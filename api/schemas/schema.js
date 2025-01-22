import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        title: String!
        total_points: Int!
        categories_completed: [ID]!
    }

    type Exercise {
        id: ID!
        name: String!
        description: String
        image: String
        categoryId: ID!
    }

    type Category {
        id: ID!
        name: String!
        description: String
        points_required: Int!
        points_rewarded: Int!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        exercises: [Exercise!]!
        exercise(id: ID!): Exercise
        exercisesByCategoryID(id: ID!): [Exercise]!
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!, title: String!): User!
        login(email: String!, password: String!): String!
        completeCategory(userId: ID!, categoryId: ID!): User!
    }

    type Subscription {
        userCreated: User!
    }
`;