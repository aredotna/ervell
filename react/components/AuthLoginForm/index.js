import React, { Component } from 'react';
import styled from 'styled-components';
import { fontSize } from 'styled-system';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';
import { pick } from 'underscore';
import axios from 'axios';

import { preset } from 'react/styles/functions';
import AuthFormContainer from 'react/components/AuthFormContainer';

const { REDIRECT_TO } = require('sharify').data;

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

  state = {
    mode: 'empty',
    email: '',
    password: '',
    error: '',
    buttonCopy: 'Log in',
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const mergedValues = Object.assign({}, this.state, { [fieldName]: fieldValue });
    const canSubmit = isEmail(mergedValues.email) && mergedValues.password.length > 6;

    this.setState({
      mode: canSubmit ? 'submit' : 'resting',
      [fieldName]: fieldValue,
    });
  }

  handleEmail = this.handleInput('email')
  handlePassword = this.handleInput('password')

  handleSubmit = (e) => {
    e.preventDefault();

    const authentication = pick(this.state, 'email', 'password');
    const component = this;

    this.setState({ buttonCopy: 'Logging in...', mode: 'submitting' });

    axios.post('/me/sign_in', authentication).then(() => {
      component.setState({
        mode: 'submitted',
        buttonCopy: 'Redirecting...',
      });
    }).then(() => {
      setTimeout(() => { window.location = REDIRECT_TO; }, 200);
    }).catch((err) => {
      component.setState({
        mode: 'resting',
        error: err,
      });
    });
  }

  render() {
    const {
      mode, email, password, error, buttonCopy,
    } = this.state;

    return (
      <AuthFormContainer onDone={this.handleSubmit}>
        <AuthFormContainer.Input
          placeholder="Email"
          tabIndex={0}
          onChange={this.handleEmail}
          value={email}
        />
        <PasswordInputContainer>
          <AuthFormContainer.Input
            placeholder="Password"
            type="password"
            onChange={this.handlePassword}
            value={password}
          />
          <Link to="/forgot">Forgot?</Link>
        </PasswordInputContainer>
        <AuthFormContainer.Message isError={error.length > 0}>
          {error}
        </AuthFormContainer.Message>
        <AuthFormContainer.Button
          disabled={mode !== 'submit'}
        >
          {buttonCopy}
        </AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA>
          Not a member? <Link to="/sign_up">Join</Link>
        </AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default AuthLoginForm;
