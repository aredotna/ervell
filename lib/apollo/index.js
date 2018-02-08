import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default (Component, mountNode) => {
  if (!mountNode) return;

ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    mountNode
  );
};
