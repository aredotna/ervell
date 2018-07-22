import sharify from 'sharify';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { mountWithApolloProvider } from 'react/apollo';

import WithStaticRouter from 'react/hocs/WithStaticRouter';

import AuthLoginPage from 'react/pages/authentication/AuthLoginPage';
import AuthJoinForm from 'react/components/AuthJoinForm';

const Routes = WithStaticRouter(() => (
  <Switch>
    <Route
      path="/log_in"
      render={() => <AuthLoginPage />}
    />
    <Route
      path="/sign_up"
      render={() => <AuthJoinForm />}
    />
  </Switch>
));

const { data: { APOLLO } } = sharify;

const mount = () => {
  const mountPoint = document.getElementById('apolloMount');

  mountWithApolloProvider(Routes, APOLLO, mountPoint);
};

module.exports = { Routes, mount };
