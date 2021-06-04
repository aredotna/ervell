import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { graphql } from '@apollo/client/react/hoc'
import axios from 'axios'
import styled from 'styled-components'
import compose from 'lodash.flowright'

import mapErrors from 'v2/util/mapErrors'
import compactObject from 'v2/util/compactObject'

import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import AuthForm from 'v2/components/AuthForm'

import PlanSelector from 'v2/components/RegistrationForm/components/PlanSelect'

import { LabelledCheckbox, Input, ErrorMessage } from 'v2/components/UI/Inputs'

import registerMutation from 'v2/components/RegistrationForm/mutations/register'
import acceptInvitationMutation from 'v2/components/RegistrationForm/mutations/acceptInvitation'

import { track, en } from 'lib/analytics.coffee'

const { REDIRECT_TO } = require('sharify').data

const RegisterButton = styled(Button)`
  background-color: ${props => props.theme.colors.background};
  ${props =>
    props.isPremium &&
    `
    border-color: ${props.theme.colors.state.premium};
    color: ${props.theme.colors.state.premium};

    &:hover {
      border-color: ${props.theme.colors.state.premium};
      color: ${props.theme.colors.state.premium};
    }
  `}
`

class RegistrationForm extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
    email: PropTypes.string,
    raw_invitation_token: PropTypes.string,
    validation_token: PropTypes.string,
    selected: PropTypes.oneOf(['basic', 'premium']),
    redirectTo: PropTypes.string,
  }

  static defaultProps = {
    email: null,
    raw_invitation_token: null,
    validation_token: null,
    selected: 'basic',
    // If the redirect location is somehow the root, lets skip that
    // and go to welcome. Anything else is fair game.
    redirectTo: REDIRECT_TO === '/' ? '/welcome' : REDIRECT_TO,
  }

  constructor(props) {
    super(props)

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
      selected: this.props.selected,
      redirectTo: this.props.redirectTo,
    }
  }

  onPlanSelect = selected => {
    const mode = selected === 'premium' ? selected : 'resting'
    const redirectTo =
      selected === 'premium' ? '/welcome/billing' : this.props.redirectTo
    this.setState({ selected, mode, redirectTo })
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) =>
    this.setState(prevState => ({
      [fieldName]: fieldValue,
      mode: 'active',
      attributeErrors: {
        ...prevState.attributeErrors,
        [fieldName]: null, // Clear specific error once typing begins
      },
    }))

  handleCheckbox = fieldName => ({ target: { checked } }) =>
    this.setState({ [fieldName]: checked })

  handleEmail = this.handleInput('email')
  handleFirstName = this.handleInput('first_name')
  handleLastName = this.handleInput('last_name')
  handlePassword = this.handleInput('password')
  handlePasswordConfirm = this.handleInput('password_confirmation')
  handleAcceptTerms = this.handleCheckbox('accept_terms')
  handleNewsletter = this.handleCheckbox('receive_newsletter')

  handleSubmit = e => {
    e.preventDefault()

    const {
      register,
      acceptInvitation,
      raw_invitation_token,
      validation_token,
    } = this.props

    const mutation = raw_invitation_token ? acceptInvitation : register

    const {
      email,
      first_name,
      last_name,
      password,
      password_confirmation,
      accept_terms,
      receive_newsletter,
      redirectTo,
    } = this.state

    this.setState({ mode: 'registering' })

    const variables = compactObject({
      email,
      first_name,
      last_name,
      password,
      accept_terms,
      password_confirmation,
      receive_newsletter,
      invitation_token: raw_invitation_token,
      validation_token,
    })

    return mutation({ variables })
      .then(() => {
        this.setState({ mode: 'logging_in' })

        return axios.post(
          '/me/sign_in',
          { email, password },
          {
            headers: {
              // Sets `req.xhr` in Express
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        )
      })
      .then(() => {
        this.setState({ mode: 'redirecting' })
        window.location = redirectTo

        track.submit(en.REGISTER)
        if (raw_invitation_token) track.submit(en.ACCEPTED_INVITATION)
      })
      .catch(err => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        })
      })
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
      selected,
    } = this.state

    return (
      <AuthForm onSubmit={this.handleSubmit}>
        <Text f={6} mb={6}>
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
          autoFocus
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

        <PlanSelector selected={selected} onPlanSelect={this.onPlanSelect} />

        <Box my={5}>
          <LabelledCheckbox
            checked={accept_terms}
            onChange={this.handleAcceptTerms}
          >
            Accept Are.na{' '}
            <a href="/terms" target="_blank">
              Terms
            </a>
            {' and '}
            <a href="/privacy" target="_blank">
              Privacy
            </a>{' '}
            conditions
          </LabelledCheckbox>

          <LabelledCheckbox
            checked={receive_newsletter}
            onChange={this.handleNewsletter}
          >
            Receive our monthly newsletter?
          </LabelledCheckbox>
        </Box>

        {mode === 'error' && (
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        )}

        <AuthForm.Submit>
          <RegisterButton
            type="submit"
            disabled={!accept_terms}
            isPremium={selected === 'premium'}
          >
            {
              {
                resting: 'Join',
                premium: 'Join with Premium',
                active: 'Join',
                registering: 'Registering...',
                logging_in: 'Logging in...',
                redirecting: 'Redirecting...',
                error: 'Error',
              }[mode]
            }
          </RegisterButton>

          <AuthForm.Subtext>
            Already a member? <Link to="/log_in">Log in</Link>
          </AuthForm.Subtext>
        </AuthForm.Submit>
      </AuthForm>
    )
  }
}

export default compose(
  graphql(registerMutation, { name: 'register' }),
  graphql(acceptInvitationMutation, { name: 'acceptInvitation' })
)(RegistrationForm)
