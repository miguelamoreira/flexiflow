import { gql } from '@apollo/client/core';
import apiClient from './apiClient';

export const GET_EXERCISES = gql`
  query GetExercises {
    exercises {
      id
      name
      description
      category_id
      image
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
      image
    }
  }
`;

export const GET_EXERCISES_BY_CATEGORY_ID = gql`
  query GetExercisesByCategoryID($id: ID!) {
    exercisesByCategoryID(id: $id) {
      id
      name
      description
      image
    }
  }
`;

export const fetchExercises = async () => {
  const { data } = await apiClient.query({ query: GET_EXERCISES });
  return data.exercises;
};

export const fetchExercise = async (id: number) => {
  const { data } = await apiClient.query({ query: GET_EXERCISE, variables: { id } });
  return data.exercise;
};

export const fetchExercisesByCategoryID = async (id: number) => {
  const { data } = await apiClient.query({
    query: GET_EXERCISES_BY_CATEGORY_ID,
    variables: { id },
  });
  return data.exercisesByCategoryID;
};
