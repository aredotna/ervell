import 'isomorphic-fetch';
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

import { Themed } from 'react/styles/theme';

import introspectionQueryResultData from 'react/apollo/fragmentTypes.json';

import clientData from 'react/apollo/localState/clientData';

const isClientSide = typeof window !== 'undefined';

const { data: { GRAPHQL_ENDPOINT, APP_URL } } = sharify;

const clientHttpLink = createHttpLink({ uri: `${APP_URL}/graphql` });
const serverHttpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export const initApolloClient = ({
  token: X_AUTH_TOKEN,
  currentRoute,
  isLoggedIn,
  cookies,
} = {}) => {
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
      cookies: {
        __typename: 'Cookies',
      },
    },
    resolvers: {
      Cookies: {
        get: (_obj, args) => cookies[args.name] || null,
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

  const httpLink = isClientSide ? clientHttpLink : serverHttpLink;

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

export const initClientSideApolloClient = () =>
  initApolloClient(clientData());

if (isClientSide) {
  initClientSideApolloClient();
}

export const wrapWithProviders =
  (client = isClientSide && window.__APOLLO_CLIENT__) =>
    (Component, props = {}) => (
      <ApolloProvider client={client}>
        <Themed>
          <Component {...props} />
        </Themed>
      </ApolloProvider>
    );

export const mountWithApolloProvider = (Component, props = {}, mountNode) => {
  if (!mountNode) return null;

  const client = initClientSideApolloClient();
  const WrappedComponent = wrapWithProviders(client)(Component, props);

  return mount(WrappedComponent, mountNode);
};
