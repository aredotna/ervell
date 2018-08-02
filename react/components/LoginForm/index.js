import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthForm from 'react/components/AuthForm';
import Button from 'react/components/UI/GenericButton';
import { mixin as textMixin } from 'react/components/UI/Text';
import { Input, ErrorMessage } from 'react/components/UI/Inputs';

const { REDIRECT_TO } = require('sharify').data;

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
  }

  handleInput = name => ({ target: { value } }) =>
    this.setState({
      mode: 'active',
      errorMessage: null,
      [name]: value,
    });

  handleEmail = this.handleInput('email')
  handlePassword = this.handleInput('password')

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ mode: 'submitting' });

    return axios
      .post('/me/sign_in', { email, password })

      .then(() => {
        this.setState({ mode: 'redirecting' });
        window.location = REDIRECT_TO;
      })

      .catch(({ response: { data: { description } } }) => {
        this.setState({
          mode: 'error',
          errorMessage: description,
        });
      });
  }

  render() {
    const {
      mode, email, password, errorMessage,
    } = this.state;

    return (
      <AuthForm onSubmit={this.handleSubmit}>
        <Input
          mb={6}
          placeholder="Email"
          type="email"
          tabIndex={0}
          onChange={this.handleEmail}
          value={email}
          hasError={mode === 'error'}
          required
        />

        <InputWithLink>
          <Input
            placeholder="Password"
            type="password"
            onChange={this.handlePassword}
            value={password}
            hasError={mode === 'error'}
            required
          />

          <Link to="/forgot">Forgot?</Link>
        </InputWithLink>

        {mode === 'error' &&
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        }

        <AuthForm.Submit>
          <Button type="submit">
            {{
              resting: 'Log in',
              active: 'Log in',
              submitting: 'Logging in...',
              redirecting: 'Redirecting...',
              error: 'Error',
            }[mode]}
          </Button>

          <AuthForm.Subtext>
            Not a member?
            {' '}
            <Link to="/sign_up">
              Join
            </Link>
          </AuthForm.Subtext>
        </AuthForm.Submit>
      </AuthForm>
    );
  }
}
