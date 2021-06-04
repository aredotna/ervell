import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import mapErrors from 'v2/util/mapErrors'

import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'
import AuthForm from 'v2/components/AuthForm'
import { Input, ErrorMessage } from 'v2/components/UI/Inputs'

import requestPasswordResetMutation from 'v2/components/ForgotPasswordForm/mutations/requestPasswordReset'

import { track, en } from 'lib/analytics.coffee'

class ForgotPasswordForm extends Component {
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
    })

  handleSubmit = e => {
    e.preventDefault()

    const { email } = this.state

    this.setState({ mode: 'requesting' })

    return this.props
      .requestPasswordReset({
        variables: { email },
      })
      .then(() => {
        this.setState({ mode: 'success' })
        track.submit(en.FORGOT_PASSWORD)
      })
      .catch(err => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        })
      })
  }

  render() {
    const { email, mode, attributeErrors, errorMessage } = this.state

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

        {mode === 'error' && (
          <ErrorMessage my={5} align="center">
            {errorMessage}
          </ErrorMessage>
        )}

        {mode === 'success' && (
          <Text f={1} my={5} align="center">
            Please check your email for a link to reset your password.
          </Text>
        )}

        <AuthForm.Submit>
          <Button type="submit" disabled={mode === 'success'}>
            {
              {
                resting: 'Reset password',
                active: 'Reset password',
                success: 'Sent',
                requesting: 'Sending...',
                error: 'Error',
              }[mode]
            }
          </Button>

          <AuthForm.Subtext>
            <Link to="/log_in">Back</Link>
          </AuthForm.Subtext>
        </AuthForm.Submit>
      </AuthForm>
    )
  }
}

export default graphql(requestPasswordResetMutation, {
  name: 'requestPasswordReset',
})(ForgotPasswordForm)
