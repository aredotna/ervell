import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import mapErrors from 'react/util/mapErrors';

import Button from 'react/components/UI/GenericButton';
import Text from 'react/components/UI/Text';
import AuthForm from 'react/components/AuthForm';
import { Input, ErrorMessage } from 'react/components/UI/Inputs';

import requestPasswordResetMutation from 'react/components/ResetPasswordForm/mutations/requestPasswordReset';

class ResetPasswordForm extends Component {
  static propTypes = {
    requestPasswordReset: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    email: '',
    attributeErrors: {},
    errorMessage: null,
  }

  handleInput = ({ target: { value: email } }) =>
    this.setState({
      mode: 'active',
      email,
    });

  handleSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;

    this.setState({ mode: 'resetting' });

    return this.props.requestPasswordReset({
      variables: { email },
    })
      .then(() =>
        this.setState({ mode: 'success' }))
      .catch((err) => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  render() {
    const {
      email,
      mode,
      attributeErrors,
      errorMessage,
    } = this.state;

    return (
      <AuthForm onSubmit={this.handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          tabIndex={0}
          value={email}
          onChange={this.handleInput}
          errorMessage={attributeErrors.email}
          required
        />

        {mode === 'error' &&
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        }

        {mode === 'success' &&
          <Text f={1} my={5} align="center">
            Please check your email for a link to reset your password.
          </Text>
        }

        <AuthForm.Submit>
          <Button type="submit" disabled={mode === 'success'}>
            {{
              resting: 'Reset password',
              active: 'Reset password',
              success: 'Sent',
              resetting: 'Resetting...',
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

export default graphql(requestPasswordResetMutation, {
  name: 'requestPasswordReset',
})(ResetPasswordForm);
