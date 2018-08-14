import axios from 'axios';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import mapErrors from 'react/util/mapErrors';

import { GenericButton as Button } from 'react/components/UI/GenericButton';
import AuthForm from 'react/components/AuthForm';
import { Input, ErrorMessage } from 'react/components/UI/Inputs';

import resetPasswordMutation from 'react/components/ResetPasswordForm/mutations/resetPassword';

import { track, en } from 'lib/analytics.coffee';

const { REDIRECT_TO } = require('sharify').data;

class ResetPasswordForm extends Component {
  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
    reset_password_token: PropTypes.string.isRequired,
  }

  state = {
    mode: 'resting',
    email: '',
    password: '',
    password_confirmation: '',
    attributeErrors: {},
    errorMessage: null,
  }

  handleInput = attr => ({ target: { value } }) =>
    this.setState({
      mode: 'active',
      [attr]: value,
    });

  handlePassword = this.handleInput('password')
  handlePasswordConfirmation = this.handleInput('password_confirmation')

  handleSubmit = (e) => {
    e.preventDefault();

    const { password, password_confirmation } = this.state;
    const { resetPassword, reset_password_token } = this.props;

    this.setState({ mode: 'resetting' });

    return resetPassword({
      variables: { token: reset_password_token, password, password_confirmation },
    })
      .then(({ data: { reset_password: { me: { email } } } }) => {
        this.setState({ mode: 'logging_in', email });
        return axios.post('/me/sign_in', { email, password });
      })

      .then(() => {
        this.setState({ mode: 'redirecting' });
        window.location = REDIRECT_TO;
        track.submit(en.RESET_PASSWORD);
      })

      .catch((err) => {
        const { response: { status } } = err;

        // Account is unconfirmed and the confirmation period is expired
        if (status === 401) {
          window.location = `/confirm/expired?email=${this.state.email}`;
          return;
        }

        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  render() {
    const {
      password,
      password_confirmation,
      mode,
      attributeErrors,
      errorMessage,
    } = this.state;

    return (
      <AuthForm onSubmit={this.handleSubmit}>
        <Input
          mb={6}
          type="password"
          placeholder="New password"
          tabIndex={0}
          value={password}
          onChange={this.handlePassword}
          errorMessage={attributeErrors.password}
          autoFocus
          required
        />

        <Input
          type="password"
          placeholder="Confirm new password"
          value={password_confirmation}
          onChange={this.handlePasswordConfirmation}
          errorMessage={attributeErrors.password_confirmation}
          required
        />

        {mode === 'error' &&
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        }

        <AuthForm.Submit>
          <Button type="submit" disabled={mode === 'success'}>
            {{
              resting: 'Reset password',
              active: 'Reset password',
              resetting: 'Resetting...',
              logging_in: 'Logging in...',
              redirecting: 'Redirecting...',
              error: 'Error',
            }[mode]}
          </Button>

          <AuthForm.Subtext>
            <Link to="/log_in">Back</Link>
          </AuthForm.Subtext>
        </AuthForm.Submit>
      </AuthForm>
    );
  }
}

export default graphql(resetPasswordMutation, {
  name: 'resetPassword',
})(ResetPasswordForm);
