import React from 'react'
import { storiesOf } from '@storybook/react'

import LoginForm from 'v2/components/LoginForm'
import RegistrationForm from 'v2/components/RegistrationForm'
import ResetPasswordForm from 'v2/components/ResetPasswordForm'
import NewChannelForm from 'v2/components/NewChannelForm'

storiesOf('Forms', module)
  .add('Login form', () => <LoginForm />)
  .add('Signup form', () => <RegistrationForm />)
  .add('Forgot password form', () => <ResetPasswordForm />)
  .add('New channel form', () => <NewChannelForm />)
