import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import LoginPage from 'v2/pages/authentication/LoginPage'
import RegistrationPage from 'v2/pages/authentication/RegistrationPage'
import ResetPasswordPage from 'v2/pages/authentication/ResetPasswordPage'
import ForgotPasswordPage from 'v2/pages/authentication/ForgotPasswordPage'
import AcceptInvitationPage from 'v2/pages/authentication/AcceptInvitationPage'

export default () => (
  <BlankLayout>
    <Switch>
      <Route path="/log_in" render={() => <LoginPage />} />

      <Route
        path="/sign_up/:plan?"
        render={parseRoute(({ params }) => (
          <RegistrationPage selected={params.plan} />
        ))}
      />

      <Route path="/forgot" render={() => <ForgotPasswordPage />} />

      <Route
        path="/reset/:reset_password_token"
        render={parseRoute(({ params }) => (
          <ResetPasswordPage
            reset_password_token={params.reset_password_token}
          />
        ))}
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
  </BlankLayout>
)
