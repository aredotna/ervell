import React from 'react';
import { storiesOf } from '@storybook/react';

import LoginForm from 'react/components/LoginForm';
import RegistrationForm from 'react/components/RegistrationForm';
import ResetPasswordForm from 'react/components/ResetPasswordForm';

storiesOf('Forms', module)
  .add('Login form', () => (
    <LoginForm />
  ))
  .add('Signup form', () => (
    <RegistrationForm />
  ))
  .add('Forgot password form', () => (
    <ResetPasswordForm />
  ));
