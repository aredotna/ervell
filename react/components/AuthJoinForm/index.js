import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import axios from 'axios';

import { Checkbox, Label } from 'react/components/UI/GenericInput';
import AuthFormContainer from 'react/components/AuthFormContainer';
import registrationMutation from 'react/components/AuthJoinForm/mutations/index';
import formatErrorObject from 'react/util/formatErrorObject';

const { REDIRECT_TO } = require('sharify').data;

class AuthJoinForm extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
  }

  state = {
    mode: 'empty',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    accept_terms: false,
    receive_newsletter: false,
    errors: {},
    errorMessage: '',
    buttonCopy: 'Join',
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    this.setState({
      [fieldName]: fieldValue,
    });
  }

  handleCheckbox = fieldName => ({ target: { checked } }) => {
    const mergedValues = { ...this.state, [fieldName]: checked };
    const { accept_terms } = mergedValues;
    this.setState({
      mode: accept_terms ? 'submit' : 'resting',
      [fieldName]: checked,
    });
  }

  handleEmail = this.handleInput('email')
  handleFirstName = this.handleInput('first_name')
  handleLastName = this.handleInput('last_name')
  handlePassword = this.handleInput('password')
  handlePasswordConfirm = this.handleInput('password_confirmation')
  handleAcceptTerms = this.handleCheckbox('accept_terms')
  handleNewsletter = this.handleCheckbox('receive_newsletter')

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      register,
    } = this.props;

    const {
      mode,
      email,
      first_name,
      last_name,
      password,
      password_confirmation,
      accept_terms,
      receive_newsletter,
    } = this.state;

    if (mode !== 'submit') return false;

    this.setState({
      mode: 'submitting',
      buttonCopy: 'Registering...',
    });

    return register({
      variables: {
        email,
        first_name,
        last_name,
        password,
        accept_terms,
        password_confirmation,
        receive_newsletter,
      },
    })
      .then(() =>
        this.setState({
          mode: 'submitted',
          buttonCopy: 'Logging in...',
        }))
      .then(() => axios.post('/me/sign_in', { email, password }).then(() =>
        this.setState({
          mode: 'submitted',
          buttonCopy: 'Redirecting...',
        })))
      .then(() => {
        setTimeout(() => { window.location = REDIRECT_TO; }, 200);
      })
      .catch((err) => {
        this.setState({
          mode: 'submit',
          buttonCopy: 'Join',
          errors: formatErrorObject(err),
        });
      });
  }

  render() {
    const {
      mode,
      email,
      first_name,
      last_name,
      password,
      password_confirmation,
      accept_terms,
      receive_newsletter,
      errors,
      errorMessage,
      buttonCopy,
    } = this.state;

    console.log('errors rendering', errors);

    return (
      <AuthFormContainer onDone={this.handleSubmit}>
        <AuthFormContainer.Headline>
          Are.na is a platform for thinking together.
        </AuthFormContainer.Headline>
        <AuthFormContainer.Input
          placeholder="Email"
          tabIndex={0}
          onChange={this.handleEmail}
          value={email}
          error={errors.email}
        />
        <AuthFormContainer.Input
          placeholder="First name"
          onChange={this.handleFirstName}
          value={first_name}
          error={errors.first_name}
        />
        <AuthFormContainer.Input
          placeholder="Last name"
          onChange={this.handleLastName}
          value={last_name}
          error={errors.last_name}
        />
        <AuthFormContainer.Input
          placeholder="Password"
          type="password"
          onChange={this.handlePassword}
          value={password}
          error={errors.password}
        />
        <AuthFormContainer.Input
          placeholder="Confirm password"
          type="password"
          onChange={this.handlePasswordConfirm}
          value={password_confirmation}
          error={errors.password_confirmation}
        />
        <Label>
          <Checkbox
            type="checkbox"
            checked={accept_terms}
            onChange={this.handleAcceptTerms}
          />
          Accept Are.na <a href="/terms" target="_blank">Terms</a> and <a href="/privacy" target="_blank">Privacy</a> conditions
        </Label>
        <Label>
          <Checkbox
            type="checkbox"
            checked={receive_newsletter}
            onChange={this.handleNewsletter}
          />
          Receive our monthly newsletter?
        </Label>
        <AuthFormContainer.Message isError={errorMessage.length > 0}>
          {errorMessage}
        </AuthFormContainer.Message>
        <AuthFormContainer.Button
          disabled={mode !== 'submit'}
        >
          {buttonCopy}
        </AuthFormContainer.Button>
        <AuthFormContainer.ButtonCTA>Already a member? <Link to="/log_in">Log in</Link></AuthFormContainer.ButtonCTA>
      </AuthFormContainer>
    );
  }
}

export default graphql(registrationMutation, { name: 'register' })(AuthJoinForm);
