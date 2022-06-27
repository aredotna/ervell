import React from 'react'
import { Route, Routes } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import LoginPage from 'v2/pages/authentication/LoginPage'
import RegistrationPage from 'v2/pages/authentication/RegistrationPage'
import ResetPasswordPage from 'v2/pages/authentication/ResetPasswordPage'
import ForgotPasswordPage from 'v2/pages/authentication/ForgotPasswordPage'
import AcceptInvitationPage from 'v2/pages/authentication/AcceptInvitationPage'

export default () => (
  <BlankLayout>
    <Routes>
      <Route path="/log_in" element={<LoginPage />} />

      <Route path="/sign_up" element={<RegistrationPage />} />

      <Route path="/sign_up/:plan" element={<RegistrationPage />} />

      <Route path="/forgot" element={<ForgotPasswordPage />} />

      <Route path="/reset/:token" element={<ResetPasswordPage />} />

      <Route path="/register/:token" element={<AcceptInvitationPage />} />
    </Routes>
  </BlankLayout>
)
