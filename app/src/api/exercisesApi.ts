import { gql } from '@apollo/client/core';
import apiClient from './apiClient';

export const GET_EXERCISES = gql`
  query GetExercises {
    exercises {
      id
      name
      description
      category_id
    }
  }
`;

export const GET_EXERCISE = gql`
  query GetExercise($id: ID!) {
    exercise(id: $id) {
      id
      name
      description
      category_id
    }
  }
`;

export const GET_EXERCISES_BY_CATEGORY_ID = gql`
  query GetExercisesByCategoryID($id: ID!) {
    exercisesByCategoryID(id: $id) {
      id
      name
      description
    }
  }
`;

export const COMPLETE_CATEGORY = gql`
  mutation CompleteCategory($userId: ID!, $categoryId: ID!) {
    completeCategory(userId: $userId, categoryId: $categoryId) {
      id
      name
      total_points
      categories_completed
    }
  }
`;

export const completeCategory = async (userId: string, categoryId: string) => {
  const { data } = await apiClient.mutate({
    mutation: COMPLETE_CATEGORY,
    variables: { userId, categoryId },
  });
  return data.completeCategory;
};


export const fetchExercises = async () => {
  const { data } = await apiClient.query({ query: GET_EXERCISES });
  return data.exercises;
};

export const fetchExercise = async (id: string) => {
  const { data } = await apiClient.query({ query: GET_EXERCISE, variables: { id } });
  return data.exercise;
};

export const fetchExercisesByCategoryID = async (id: string) => {
  const { data } = await apiClient.query({
    query: GET_EXERCISES_BY_CATEGORY_ID,
    variables: { id },
  });
  return data.exercisesByCategoryID;
};
