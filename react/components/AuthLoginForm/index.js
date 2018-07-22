import React, { Component } from 'react';
import styled from 'styled-components';
import { fontSize } from 'styled-system';
import { Link } from 'react-router-dom';

import { preset } from 'react/styles/functions';

import AuthFormContainer from 'react/components/AuthFormContainer';

const PasswordInputContainer = styled.div`
  position: relative;

  a {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1em;
    color: ${x => x.theme.colors.gray.base};
    font-family: ${x => x.theme.fonts.sans};
    text-decoration: none;
    ${preset(fontSize, { f: 1 })}
  }
`;

class AuthLoginForm extends Component {
  static propTypes = {}

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting', e);
  }

  render() {
    return (
      <AuthFormContainer onDone={this.handleSubmit}>
        <AuthFormContainer.Input placeholder="Email" tabIndex={0} />
        <PasswordInputContainer>
          <AuthFormContainer.Input placeholder="Password" type="password" />
          <Link to="/forgot">Forgot?</Link>
        </PasswordInputContainer>
        <AuthFormContainer.Button>Log in</AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA>Not a member? <Link to="/sign_up">Join</Link></AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default AuthLoginForm;
