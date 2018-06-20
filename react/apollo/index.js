import 'isomorphic-fetch';
import url from 'url';
import sharify from 'sharify';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import mount from 'react/util/mount';

import introspectionQueryResultData from 'react/apollo/fragmentTypes.json';

const isClientSide = typeof window !== 'undefined';

const { data: { GRAPHQL_ENDPOINT } } = sharify;

const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: introspectionQueryResultData,
    },
  },
});

export const initApolloClient = ({ token: X_AUTH_TOKEN, currentRoute, isLoggedIn } = {}) => {
  if (isClientSide && window.__APOLLO_CLIENT__) {
    return window.__APOLLO_CLIENT__;
  }

  const cache = new InMemoryCache({ fragmentMatcher });

  if (isClientSide && window.__APOLLO_STATE__) {
    cache.restore(window.__APOLLO_STATE__);
  }

  const { data: { X_APP_TOKEN } } = sharify;

  const stateLink = withClientState({
    cache,
    defaults: {
      currentRoute: {
        __typename: 'CurrentRoute',
        ...currentRoute,
      },
      loginStatus: {
        __typename: 'LoginStatus',
        isLoggedIn,
      },
    },
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'X-AUTH-TOKEN': X_AUTH_TOKEN,
      'X-APP-TOKEN': X_APP_TOKEN,
    },
  }));

  const link = ApolloLink.from([
    authLink,
    stateLink,
    httpLink,
  ]);

  const client = new ApolloClient({
    ssrMode: !isClientSide,
    link,
    cache,
  });

  if (isClientSide) {
    window.__APOLLO_CLIENT__ = client;
  }

  return client;
};

export const initClientSideApolloClient = () => {
  const { data: { CURRENT_USER, CURRENT_URL } } = sharify;

  const currentRoute = { ...url.parse(CURRENT_URL) };
  const isLoggedIn = !!(CURRENT_USER && CURRENT_USER.id);

  return initApolloClient({
    token: CURRENT_USER && CURRENT_USER.authentication_token,
    currentRoute,
    isLoggedIn,
  });
};

if (isClientSide) {
  initClientSideApolloClient();
}

export const wrapWithApolloProvider = (client = isClientSide && window.__APOLLO_CLIENT__) =>
  (Component, props = {}) => (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );

export const mountWithApolloProvider = (Component, props = {}, mountNode) => {
  if (!mountNode) return null;

  const client = initClientSideApolloClient();
  const WrappedComponent = wrapWithApolloProvider(client)(Component, props);

  return mount(WrappedComponent, mountNode);
};
