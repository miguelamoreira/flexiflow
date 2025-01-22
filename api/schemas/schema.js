import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        title: String!
        total_points: Int!
        categories_completed: String!
    }

    type Exercise {
        id: ID!
        name: String!
        description: String
        image: String
        category_id: ID!
    }

    type Category {
        id: ID!
        name: String!
        description: String
        min_points: Int!
        points: Int!
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