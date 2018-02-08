import sharify from 'sharify';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const { data: { CURRENT_USER } } = sharify;
  const X_AUTH_TOKEN = CURRENT_USER && CURRENT_USER.authentication_token || '';

  return {
    headers: {
      ...headers,
      'X-AUTH-TOKEN': X_AUTH_TOKEN
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
