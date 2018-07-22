import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthFormContainer from 'react/components/AuthFormContainer';

class AuthJoinForm extends Component {
  static propTypes = {}

  render() {
    return (
      <AuthFormContainer onDone={() => {}}>
        <AuthFormContainer.Headline>
          Are.na is a platform for thinking together.
        </AuthFormContainer.Headline>
        <AuthFormContainer.Input placeholder="Email" tabIndex={0} />
        <AuthFormContainer.Input placeholder="First name" />
        <AuthFormContainer.Input placeholder="Last name" />
        <AuthFormContainer.Input placeholder="Password" type="password" />
        <AuthFormContainer.Input placeholder="Confirm password" type="password" />
        <AuthFormContainer.Button>Join</AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA>Already a member? <Link to="/log_in">Log in</Link></AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default AuthJoinForm;
