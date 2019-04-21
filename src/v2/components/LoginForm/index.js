import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { Input as SafeInput } from 'react-safe-universal-inputs';

import AuthForm from 'v2/components/AuthForm';
import { GenericButton as Button } from 'v2/components/UI/GenericButton';
import { mixin as textMixin } from 'v2/components/UI/Text';
import { ErrorMessage } from 'v2/components/UI/Inputs';

import mixin from 'v2/components/UI/Inputs/mixin';

import { track, en } from 'lib/analytics.coffee';

const { REDIRECT_TO } = require('sharify').data;

// We need to handle the states between server rendered react
// and client-rendered react. Firefox was firing the onChange event
// (for auto-filled inputs) before the client was initialized.
//
// (Should not be used on anything but this login form.)
//
// More info here:
// https://github.com/facebook/react/issues/2585
// https://github.com/facebook/react/issues/4293

// Prevent hasError from being passed along into `SafeInput`
// which is giving us annoying warnings.
//
// eslint-disable-next-line
const WrappedSafeInput = ({ hasError: _hasError, ...rest }) => (
  <SafeInput {...rest} />
);

const Input = styled(WrappedSafeInput)`
  ${mixin}
`;

const InputWithLink = styled.div.attrs({
  fontSize: 1,
})`
  position: relative;
  ${textMixin}

  a {
    position: absolute;
    ${textMixin}
    top: 50%;
    right: 1em;
    transform: translateY(-50%);
  }
`;

export default class LoginForm extends Component {
  state = {
    mode: 'resting',
    email: '',
    password: '',
    errorMessage: null,
  };

  handleEarlyInput = inputNode => {
    const { name, value } = inputNode;

    this.setState({
      [name]: value,
    });
  };

  handleInput = name => ({ target: { value } }) =>
    this.setState({
      mode: 'active',
      errorMessage: null,
      [name]: value,
    });

  handleEmail = this.handleInput('email');
  handlePassword = this.handleInput('password');

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ mode: 'submitting' });

    return axios
      .post(
        '/me/sign_in',
        { email, password },
        {
          headers: {
            // Sets `req.xhr` in Express
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      )

      .then(() => {
        this.setState({ mode: 'redirecting' });
        window.location = REDIRECT_TO;
        track.submit(en.LOGIN);
      })

      .catch(({ response: { status, data: { description } } }) => {
        // Account is unconfirmed and the confirmation period is expired
        if (status === 401) {
          window.location = `/confirm/expired?${qs.stringify({
            email: this.state.email,
          })}`;
          return;
        }

        this.setState({
          mode: 'error',
          errorMessage: description,
        });
      });
  };

  render() {
    const { mode, email, password, errorMessage } = this.state;

    return (
      <AuthForm onSubmit={this.handleSubmit} action="/me/sign_in" method="post">
        <Input
          mb={6}
          placeholder="Email"
          type="email"
          name="email"
          tabIndex={0}
          onChange={this.handleEmail}
          onEarlyInput={this.handleEarlyInput}
          value={email}
          hasError={mode === 'error'}
          required
          autoFocus
        />

        <InputWithLink>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handlePassword}
            value={password}
            hasError={mode === 'error'}
            onEarlyInput={this.handleEarlyInput}
            required
          />

          <Link to="/forgot">Forgot?</Link>
        </InputWithLink>

        {mode === 'error' && (
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        )}

        <AuthForm.Submit>
          <Button type="submit">
            {
              {
                resting: 'Log in',
                active: 'Log in',
                submitting: 'Logging in...',
                redirecting: 'Redirecting...',
                error: 'Error',
              }[mode]
            }
          </Button>

          <AuthForm.Subtext>
            Not a member? <Link to="/sign_up">Join</Link>
          </AuthForm.Subtext>
        </AuthForm.Submit>
      </AuthForm>
    );
  }
}
