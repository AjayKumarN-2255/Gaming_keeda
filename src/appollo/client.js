import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://wordpress-769373-6361991.cloudwaysapps.com/graphql",
        credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
});

export default client;