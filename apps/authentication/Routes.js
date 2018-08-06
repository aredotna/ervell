import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import LoginPage from 'react/pages/authentication/LoginPage';
import RegistrationPage from 'react/pages/authentication/RegistrationPage';
import ForgotPasswordPage from 'react/pages/authentication/ForgotPasswordPage';
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
      render={() => <ForgotPasswordPage />}
    />

    <Route
      path="/register/:invitation_token"
      render={parseRoute(({ params, query }) => (
        <AcceptInvitationPage
          invitation_token={params.invitation_token}
          raw_invitation_token={query.invite_token}
        />
      ))}
    />
  </Switch>
);
