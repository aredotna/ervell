import sharify from 'sharify';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { mountWithApolloProvider } from 'react/apollo';

import withStaticRouter from 'react/hocs/WithStaticRouter';
import withBrowserRouter from 'react/hocs/WithBrowserRouter';

import LoginPage from 'react/pages/authentication/LoginPage';
import RegistrationPage from 'react/pages/authentication/RegistrationPage';
import ResetPasswordPage from 'react/pages/authentication/ResetPasswordPage';

const Routes = () => (
  <Switch>
    <Route
      path="/log_in"
      render={() => <LoginPage />}
    />
    <Route
      path="/sign_up"
      render={() => <RegistrationPage />}
    />
    <Route
      path="/forgot"
      render={() => <ResetPasswordPage />}
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
