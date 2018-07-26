import React from 'react';
import { storiesOf } from '@storybook/react';

import AuthLoginForm from 'react/components/AuthLoginForm';
import AuthJoinForm from 'react/components/AuthJoinForm';
import AuthForgotPasswordForm from 'react/components/AuthForgotPasswordForm';

storiesOf('Forms', module)
  .add('Login form', () => (
    <AuthLoginForm />
  ))
  .add('Signup form', () => (
    <AuthJoinForm />
  ))
  .add('Forgot password form', () => (
    <AuthForgotPasswordForm />
  ));
