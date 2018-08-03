import sharify from 'sharify';

import { mountWithApolloProvider } from 'react/apollo';

import withBrowserRouter from 'react/hocs/WithBrowserRouter';

import Routes from 'apps/authentication/Routes';

const { data: { APOLLO } } = sharify;

document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('apolloMount');
  mountWithApolloProvider(withBrowserRouter(Routes), APOLLO, mountPoint);
});
