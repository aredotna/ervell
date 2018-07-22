import sharify from 'sharify';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { mountWithApolloProvider } from 'react/apollo';

import withStaticRouter from 'react/hocs/WithStaticRouter';
import withBrowserRouter from 'react/hocs/WithBrowserRouter';

import AuthLoginPage from 'react/pages/authentication/AuthLoginPage';
import AuthJoinPage from 'react/pages/authentication/AuthJoinPage';
import AuthForgotPasswordPage from 'react/pages/authentication/AuthForgotPasswordPage';

const Routes = () => (
  <Switch>
    <Route
      path="/log_in"
      render={() => <AuthLoginPage />}
    />
    <Route
      path="/sign_up"
      render={() => <AuthJoinPage />}
    />
    <Route
      path="/forgot"
      render={() => <AuthForgotPasswordPage />}
    />
  </Switch>
);

const StaticRoutes = withStaticRouter(Routes);
const ClientRoutes = withBrowserRouter(Routes);

const { data: { APOLLO } } = sharify;

const mount = () => {
  const mountPoint = document.getElementById('apolloMount');

  mountWithApolloProvider(ClientRoutes, APOLLO, mountPoint);
};

module.exports = { StaticRoutes, mount };
