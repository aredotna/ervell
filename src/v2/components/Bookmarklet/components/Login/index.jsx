import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Layout from 'v2/components/Bookmarklet/components/Layout'

import mapErrors from 'v2/util/mapErrors'
import { Input, ErrorMessage } from 'v2/components/UI/Inputs'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'

import CenterStretchBox from 'v2/components/Bookmarklet/components/UI/CenterStretchBox'

import Icons from 'v2/components/UI/Icons'

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

class Login extends Component {
  state = {
    mode: 'resting',
    email: '',
    password: '',
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
    }))

  handleEmail = this.handleInput('email')
  handlePassword = this.handleInput('password')

  handleSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state

    this.setState({ mode: 'submitting' })

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
        this.setState({ mode: 'redirecting' })

        window.location.reload()
      })
      .catch(err => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        })
      })
  }

  openArena = () => window.open('https://www.are.na', '_blank')

  render() {
    const { email, password, mode, attributeErrors, errorMessage } = this.state

    return (
      <Layout>
        <CenterStretchBox>
          <LoginForm onSubmit={this.handleSubmit}>
            <Icons name="ArenaMark" size={8} mb={7} onClick={this.openArena} />

            <Input
              mb={6}
              type="email"
              placeholder="Email"
              tabIndex={0}
              onChange={this.handleEmail}
              value={email}
              errorMessage={attributeErrors.email}
              required
              autoFocus
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

            {mode === 'error' && (
              <ErrorMessage my={5} align="center">
                {errorMessage}
              </ErrorMessage>
            )}

            <Button type="submit" mt={6}>
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
          </LoginForm>
        </CenterStretchBox>
      </Layout>
    )
  }
}

export default Login
