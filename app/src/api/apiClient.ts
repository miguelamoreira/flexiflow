import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const apiClient = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default apiClient;
