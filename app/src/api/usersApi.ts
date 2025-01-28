import { gql } from '@apollo/client/core';
import apiClient from './apiClient';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      title
      total_points
      categories_completed
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      title
      total_points
      categories_completed
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      title
      total_points
      categories_completed
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const USER_CREATED = gql`
  subscription UserCreated {
    userCreated {
      id
      name
      email
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

export const UPDATE_USER_TITLE = gql`
  mutation UpdateUserTitle($id: ID!, $title: String!) {
    UpdateUserTitle(id: $id, title: $title) {
      id
      name
      email
      title
      total_points
      categories_completed
    }
  }
`;

export const fetchUsers = async () => {
  const { data } = await apiClient.query({ query: GET_USERS });
  console.log(data);
  
  return data.users;
};

export const fetchUser = async (id: number) => {
  const { data } = await apiClient.query({ query: GET_USER, variables: { id } });
  return data.user;
};

export const updateUserTitle = async (id: string, title: string) => {
  const { data } = await apiClient.mutate({ mutation: UPDATE_USER_TITLE, variables: { id, title } });
  return data.user;
};

export const createUser = async (name: string, email: string, password: string) => {
  const { data } = await apiClient.mutate({
    mutation: CREATE_USER,
    variables: { name, email, password },
  });
  return data.createUser;
};

export const login = async (email: string, password: string) => {
  const { data } = await apiClient.mutate({
    mutation: LOGIN,
    variables: { email, password },
  });
  return data.login;
};

export const completeCategory = async (userId: string, categoryId: string) => {
  const { data } = await apiClient.mutate({
    mutation: COMPLETE_CATEGORY,
    variables: { userId, categoryId },
  });
  return data.completeCategory;
};