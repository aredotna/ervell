import sharify from 'sharify';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import mount from 'react/util/mount';

const { data: { GRAPHQL_ENDPOINT, X_APP_TOKEN } } = sharify;

const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const authLink = setContext((_, { headers }) => {
  const { data: { CURRENT_USER } } = sharify;
  const X_AUTH_TOKEN = (CURRENT_USER && CURRENT_USER.authentication_token) || '';

  return {
    headers: {
      ...headers,
      'X-AUTH-TOKEN': X_AUTH_TOKEN,
      'X-APP-TOKEN': X_APP_TOKEN,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const provide = (Component, props = {}) => (
  <ApolloProvider client={client}>
    <Component {...props} />
  </ApolloProvider>
);

export default (Component, props = {}, mountNode) => {
  if (!mountNode) return null;

  return mount(provide(Component, props), mountNode);
};
