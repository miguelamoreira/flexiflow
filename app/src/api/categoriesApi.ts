import { gql } from '@apollo/client/core';
import apiClient from './apiClient';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      points
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      points
    }
  }
`;

export const fetchCategories = async () => {
  const { data } = await apiClient.query({ query: GET_CATEGORIES });
  return data.categories;
};

export const fetchCategory = async (id: string) => {
  const { data } = await apiClient.query({ query: GET_CATEGORY, variables: { id } });
  return data.category;
};
