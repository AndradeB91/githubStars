import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const graphqlClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.github.com/graphql'
    // another graphql endpoint to test:
    // uri: 'https://worldcup-graphql.now.sh/',
  }),
  cache: new InMemoryCache(),
});