import React, { Component } from 'react';

import AuthFormContainer from 'react/components/AuthFormContainer';

class AuthLoginForm extends Component {
  static propTypes = {}

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting', e);
  }

  render() {
    return (
      <AuthFormContainer >
        <AuthFormContainer.Input placeholder="Email" tabIndex={0} />
        <AuthFormContainer.Input placeholder="Password" type="password" />
        <AuthFormContainer.Button>Log in</AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA>Not a member? <a href="/join">Join</a></AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default AuthLoginForm;
