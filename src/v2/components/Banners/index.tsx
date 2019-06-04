import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Banner from 'v2/components/UI/Banner'
import Truncate from 'v2/components/UI/Truncate'
import {
  GenericButton,
  GenericButtonLink,
} from 'v2/components/UI/GenericButton'

import resendConfirmationEmailMutation from 'v2/components/Banners/mutations/resendConfirmationEmail'

const Button = styled(GenericButton).attrs({
  f: 3,
  ml: 6,
  mt: [6, 6, 0],
})``

const ButtonLink = styled(GenericButtonLink).attrs({
  f: 3,
  ml: 6,
  mt: [6, 6, 0],
})``

interface ConfirmBlockProps {
  resendConfirmationEmail: any
}

const __Confirm__: React.FC<ConfirmBlockProps> = ({
  resendConfirmationEmail,
  ...rest
}) => {
  const [mode, setMode] = useState('resting')

  return (
    <Banner
      bg="state.neutral"
      color="gray.base"
      iconName="Clipboard"
      isCloseable={false}
      {...rest}
    >
      <Box>
        Please check your email to confirm your account. Haven’t received an
        email yet?
      </Box>

      <Button
        disabled={mode === 'sent'}
        onClick={() => {
          setMode('sending')
          resendConfirmationEmail()
            .then(() => setMode('sent'))
            .catch(() => setMode('error'))
        }}
      >
        {
          {
            resting: 'Resend email',
            sending: 'Sending...',
            sent: 'Sent',
            error: 'Error',
          }[mode]
        }
      </Button>
    </Banner>
  )
}

export const Confirm = graphql<ConfirmBlockProps>(
  resendConfirmationEmailMutation,
  {
    name: 'resendConfirmationEmail',
  }
)(__Confirm__)

export const Bookmarklet = props => (
  <Banner bg="state.neutral" color="gray.base" iconName="Question" {...props}>
    <Box>Save content from any website with the Are.na bookmarklet.</Box>

    <ButtonLink href="/tools/bookmarklet">Install</ButtonLink>
  </Banner>
)

export const Invite = props => (
  <Banner bg="state.neutral" color="gray.base" iconName="Info" {...props}>
    <Box>Invite friends to collaborate on Are.na.</Box>

    <ButtonLink href="/tools/send-invitation">Send invite</ButtonLink>
  </Banner>
)

export const ProposePremium = props => (
  <Banner bg="state.premium" color="white" iconName="Exclaim" {...props}>
    <Box>
      Get 25% off Are.na Premium with the coupon code{' '}
      <Text display="inline" font="mono" color="white">
        flower
      </Text>
    </Box>

    <ButtonLink color="white" href="/settings/billing">
      Learn more
    </ButtonLink>
  </Banner>
)

export const StronglyProposePremium = props => (
  <Banner bg="state.premium" color="white" iconName="Exclaim" {...props}>
    You’ve run out of free blocks. Please&nbsp;
    <a href="/settings/billing">upgrade to Premium</a>
    &nbsp;to keep connecting.
  </Banner>
)

interface LoggedOutExploreBlockProps {
  isLoggedIn: boolean
}

const __LoggedOutExplore__: React.FC<LoggedOutExploreBlockProps> = ({
  isLoggedIn,
  ...rest
}) =>
  !isLoggedIn ? (
    <Banner
      bg="white"
      borderTop="3px solid"
      borderColor="gray.light"
      isCloseable={false}
      {...rest}
    >
      <Text f={5} fontWeight="normal">
        Make channels, add content, connect ideas.
      </Text>

      <ButtonLink href="/sign_up">Sign up</ButtonLink>
    </Banner>
  ) : null

export const LoggedOutExplore = WithLoginStatus(__LoggedOutExplore__)

const __LoggedOutProfile__: React.FC<LoggedOutProfileProps> = ({
  isLoggedIn,
  name,
  ...rest
}) =>
  !isLoggedIn ? (
    <Banner
      bg="white"
      borderTop="3px
      solid"
      borderColor="gray.light"
      isCloseable={false}
      {...rest}
    >
      <Text f={5} fontWeight="normal">
        Join Are.na to follow <Truncate length={40}>{name}</Truncate>
      </Text>

      <ButtonLink href="/sign_up">Sign up</ButtonLink>

      <ButtonLink href="/explore">Explore</ButtonLink>
    </Banner>
  ) : null

interface LoggedOutProfileProps {
  isLoggedIn: boolean
  name: string
}

export const LoggedOutProfile = WithLoginStatus(__LoggedOutProfile__)

export const LoggedOutChannel = LoggedOutProfile

export default {
  STRONGLY_PROPOSE_PREMIUM: StronglyProposePremium,
  PROPOSE_PREMIUM: ProposePremium,
  CONFIRM: Confirm,
  BOOKMARKLET: Bookmarklet,
  INVITE: Invite,
  LOGGED_OUT_EXPLORE: LoggedOutExplore,
  LOGGED_OUT_PROFILE: LoggedOutProfile,
  LOGGED_OUT_CHANNEL: LoggedOutChannel,
}
