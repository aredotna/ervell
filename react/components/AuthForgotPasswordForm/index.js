import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { isEmail } from 'validator';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthFormContainer from 'react/components/AuthFormContainer';
import requestPasswordReset from 'react/components/AuthForgotPasswordForm/queries/index';

class AuthForgotPasswordForm extends Component {
  static propTypes = {
    requestPasswordReset: PropTypes.func.isRequired,
  }

  state = {
    mode: 'empty',
    email: '',
    error: '',
    message: '',
  }

  handleInput = ({ target: { value: fieldValue } }) => {
    const canSubmit = fieldValue.length > 0 && isEmail(fieldValue);
    this.setState({
      mode: canSubmit ? 'resting' : 'empty',
      email: fieldValue,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.mode !== 'resting') return false;

    this.setState({
      mode: 'submitting',
    });

    return this.props.requestPasswordReset({
      variables: { email: this.state.email },
    })
      .then(() => {
        this.setState({
          mode: 'submitted',
          message: 'Please check your email for a link to reset your password.',
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  render() {
    const {
      email, mode, error, message,
    } = this.state;

    return (
      <AuthFormContainer onDone={this.handleSubmit}>
        <AuthFormContainer.Input
          placeholder="Email"
          tabIndex={0}
          value={email}
          onChange={this.handleInput}
        />
        <AuthFormContainer.Message isError={error.length > 0}>
          {error || message}
        </AuthFormContainer.Message>
        <AuthFormContainer.Button
          disabled={mode !== 'resting'}
        >
          Reset password
        </AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA><Link to="/log_in">Back</Link></AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default graphql(requestPasswordReset, { name: 'requestPasswordReset' })(AuthForgotPasswordForm);
