import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SERVER_URI = 'http://XX.X.X.XX:4000/graphql'; // ADD YOUR LOCAL IP ADDRESS

const client = new ApolloClient({
  link: new HttpLink({
    uri: SERVER_URI,
  }),
  cache: new InMemoryCache(),
});

export default client;
