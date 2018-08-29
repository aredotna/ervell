import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import axios from 'axios';

import mapErrors from 'react/util/mapErrors';
import compactObject from 'react/util/compactObject';

import { GenericButton as Button } from 'react/components/UI/GenericButton';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import AuthForm from 'react/components/AuthForm';
import { LabelledCheckbox, Input, ErrorMessage } from 'react/components/UI/Inputs';

import registerMutation from 'react/components/RegistrationForm/mutations/register';
import acceptInvitationMutation from 'react/components/RegistrationForm/mutations/acceptInvitation';

import { track, en } from 'lib/analytics.coffee';

const { REDIRECT_TO } = require('sharify').data;

class RegistrationForm extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
    email: PropTypes.string,
    raw_invitation_token: PropTypes.string,
  }

  static defaultProps = {
    email: null,
    raw_invitation_token: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      mode: 'resting',
      email: props.email || '',
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
      accept_terms: false,
      receive_newsletter: false,
      attributeErrors: {},
      errorMessage: null,
    };
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

    const {
      register,
      acceptInvitation,
      raw_invitation_token,
    } = this.props;

    const mutation = raw_invitation_token ?
      acceptInvitation : register;

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

    const variables = compactObject({
      email,
      first_name,
      last_name,
      password,
      accept_terms,
      password_confirmation,
      receive_newsletter,
      invitation_token: raw_invitation_token,
    });

    return mutation({ variables })
      .then(() => {
        this.setState({ mode: 'logging_in' });
        return axios.post('/me/sign_in', { email, password });
      })
      .then(() => {
        this.setState({ mode: 'redirecting' });

        // If the redirect location is somehow the root, lets skip that
        // and go to welcome. Anything else is fair game.
        const redirectLocation = REDIRECT_TO === '/' ? '/welcome' : REDIRECT_TO;
        window.location = redirectLocation;

        track.submit(en.REGISTER);
        if (raw_invitation_token) track.submit(en.ACCEPTED_INVITATION);
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
          readOnly={!!this.props.email}
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
          <LabelledCheckbox
            checked={accept_terms}
            onChange={this.handleAcceptTerms}
          >
            Accept Are.na
            {' '}
            <a href="/terms" target="_blank">Terms</a>
            {' and '}
            <a href="/privacy" target="_blank">Privacy</a>
            {' '}
            conditions
          </LabelledCheckbox>

          <LabelledCheckbox
            checked={receive_newsletter}
            onChange={this.handleNewsletter}
          >
            Receive our monthly newsletter?
          </LabelledCheckbox>
        </Box>

        {mode === 'error' &&
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        }

        <AuthForm.Submit>
          <Button type="submit" disabled={!accept_terms}>
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

export default compose(
  graphql(registerMutation, { name: 'register' }),
  graphql(acceptInvitationMutation, { name: 'acceptInvitation' }),
)(RegistrationForm);
