import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'
import sharify from 'sharify'

import inviteeQuery from 'v2/pages/authentication/AcceptInvitationPage/queries/invitee'

import Head from 'v2/components/UI/Head'
import Title from 'v2/components/UI/Head/components/Title'
import Icons from 'v2/components/UI/Icons'
import CenteringBox from 'v2/components/UI/CenteringBox'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Text from 'v2/components/UI/Text'
import RegistrationForm from 'v2/components/RegistrationForm'

const {
  data: { RECAPTCHA_SITE_KEY },
} = sharify

export default class AcceptInvitationPage extends Component {
  static propTypes = {
    // `invitation_token` is used to locate the invite
    // it is a digest of `raw_invitation_token` and exists on the user record.
    invitation_token: PropTypes.string.isRequired,
    // `raw_invitation_token` is used to accept the invite
    // it is not in the database directly.
    // At the moment this is passed as `invite_token` in the
    // query string of the URL in the invitation email
    raw_invitation_token: PropTypes.string,
  }

  static defaultProps = {
    raw_invitation_token: null,
  }

  state = {
    validation_token: null,
  }

  componentDidMount() {
    window.onRecaptchaLoad = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: 'homepage' })
          .then(validation_token => this.setState({ validation_token }))
      })
    }
  }

  render() {
    const { validation_token } = this.state
    const { invitation_token, raw_invitation_token } = this.props

    return (
      <Query query={inviteeQuery} variables={{ invitation_token }} ssr={false}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <CenteringBox>
                <LoadingIndicator />
              </CenteringBox>
            )
          }

          if (error) {
            return (
              <CenteringBox p={7} flexDirection="column">
                <Title>Sorry</Title>

                <Icons name="ArenaMark" size={7} mb={9} />

                <Text f={5} mb={6}>
                  We cannot find that invitation code.
                </Text>

                <Text f={2} underlineLinks>
                  If you believe this is in error please contact{' '}
                  <a href="mailto:help@are.na">help@are.na</a>
                </Text>
              </CenteringBox>
            )
          }

          return (
            <CenteringBox p={7}>
              <Head>
                <script
                  src={`https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=${RECAPTCHA_SITE_KEY}`}
                />
              </Head>

              <Title>Complete Your Registration</Title>

              <RegistrationForm
                email={data.invitee.email}
                raw_invitation_token={raw_invitation_token}
                validation_token={validation_token}
              />
            </CenteringBox>
          )
        }}
      </Query>
    )
  }
}
