import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import axios from 'axios';

import mapErrors from 'react/util/mapErrors';

import Button from 'react/components/UI/GenericButton';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import AuthForm from 'react/components/AuthForm';
import { Checkbox, Label, Input, ErrorMessage } from 'react/components/UI/Inputs';

import registerMutation from 'react/components/RegistrationForm/mutations/register';

const { REDIRECT_TO } = require('sharify').data;

class RegistrationForm extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    accept_terms: false,
    receive_newsletter: false,
    attributeErrors: {},
    errorMessage: null,
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) =>
    this.setState(prevState => ({
      [fieldName]: fieldValue,
      mode: 'active',
      attributeErrors: {
        ...prevState.attributeErrors,
        [fieldName]: null, // Clear specific error once typing begins
      },
    }));

  handleCheckbox = fieldName => ({ target: { checked } }) =>
    this.setState({ [fieldName]: checked })

  handleEmail = this.handleInput('email')
  handleFirstName = this.handleInput('first_name')
  handleLastName = this.handleInput('last_name')
  handlePassword = this.handleInput('password')
  handlePasswordConfirm = this.handleInput('password_confirmation')
  handleAcceptTerms = this.handleCheckbox('accept_terms')
  handleNewsletter = this.handleCheckbox('receive_newsletter')

  handleSubmit = (e) => {
    e.preventDefault();

    const { register } = this.props;

    const {
      email,
      first_name,
      last_name,
      password,
      password_confirmation,
      accept_terms,
      receive_newsletter,
    } = this.state;

    this.setState({ mode: 'registering' });

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
      .then(() => {
        this.setState({ mode: 'logging_in' });
        return axios.post('/me/sign_in', { email, password });
      })
      .then(() => {
        window.location = REDIRECT_TO;
        this.setState({ mode: 'redirecting' });
      })
      .catch((err) => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
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
      attributeErrors,
      errorMessage,
    } = this.state;

    return (
      <AuthForm onSubmit={this.handleSubmit}>
        <Text f={7} mb={6}>
          Are.na is a platform for thinking together.
        </Text>

        <Input
          mb={6}
          type="email"
          placeholder="Email"
          tabIndex={0}
          onChange={this.handleEmail}
          value={email}
          errorMessage={attributeErrors.email}
          required
        />

        <Input
          mb={6}
          placeholder="First name"
          onChange={this.handleFirstName}
          value={first_name}
          errorMessage={attributeErrors.first_name}
          required
        />

        <Input
          mb={6}
          placeholder="Last name"
          onChange={this.handleLastName}
          value={last_name}
          errorMessage={attributeErrors.last_name}
          required
        />

        <Input
          mb={6}
          placeholder="Password"
          type="password"
          onChange={this.handlePassword}
          value={password}
          errorMessage={attributeErrors.password}
          required
        />

        <Input
          mb={6}
          placeholder="Confirm password"
          type="password"
          onChange={this.handlePasswordConfirm}
          value={password_confirmation}
          errorMessage={attributeErrors.password_confirmation}
          required
        />

        <Box my={5}>
          <Label>
            <Checkbox
              type="checkbox"
              checked={accept_terms}
              onChange={this.handleAcceptTerms}
            />

            Accept Are.na
            {' '}
            <a href="/terms" target="_blank">Terms</a>
            {' and '}
            <a href="/privacy" target="_blank">Privacy</a>
            {' '}
            conditions
          </Label>

          <Label>
            <Checkbox
              type="checkbox"
              checked={receive_newsletter}
              onChange={this.handleNewsletter}
            />
            Receive our monthly newsletter?
          </Label>
        </Box>

        {mode === 'error' &&
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        }

        <AuthForm.Submit>
          <Button disabled={!accept_terms}>
            {{
              resting: 'Join',
              active: 'Join',
              registering: 'Registering...',
              logging_in: 'Logging in...',
              redirecting: 'Redirecting...',
              error: 'Error',
            }[mode]}
          </Button>

          <AuthForm.Subtext>
            Already a member?
            {' '}
            <Link to="/log_in">Log in</Link>
          </AuthForm.Subtext>
        </AuthForm.Submit>
      </AuthForm>
    );
  }
}

export default graphql(registerMutation, {
  name: 'register',
})(RegistrationForm);
