import React, { Component } from 'react';

import AuthFormContainer from 'react/components/AuthFormContainer';

class AuthForgotPasswordForm extends Component {
  static propTypes = {}

  render() {
    return (
      <AuthFormContainer>
        <AuthFormContainer.Input placeholder="Email" tabIndex={0} />
        <AuthFormContainer.Button>Reset password</AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA><a href="/log_in">Back</a></AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default AuthForgotPasswordForm;
