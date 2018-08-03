import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import LoginPage from 'react/pages/authentication/LoginPage';
import RegistrationPage from 'react/pages/authentication/RegistrationPage';
import ResetPasswordPage from 'react/pages/authentication/ResetPasswordPage';
import AcceptInvitationPage from 'react/pages/authentication/AcceptInvitationPage';

export default () => (
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

    <Route
      path="/register/:token"
      render={parseRoute(({ params, query }) => (
        <AcceptInvitationPage
          {...params}
          {...query}
        />
      ))}
    />
  </Switch>
);
