import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SERVER_URI = 'http://10.0.0.237:4000/graphql'; // ADD YOUR LOCAL IP ADDRESS
const str = /[X]/;

if (SERVER_URI.search(str) !== -1) {
  console.log(
    "Please change the SERVER_URI for your IP address in 'apolloClient.ts'"
  );
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: SERVER_URI,
  }),
  cache: new InMemoryCache(),
});

export default client;
