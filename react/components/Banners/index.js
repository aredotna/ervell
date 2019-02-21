import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Banner from 'react/components/UI/Banner';
import Truncate from 'react/components/UI/Truncate';
import { GenericButton, GenericButtonLink } from 'react/components/UI/GenericButton';

import resendConfirmationEmailMutation from 'react/components/Banners/mutations/resendConfirmationEmail';

const Button = styled(GenericButton).attrs({
  f: 3,
  ml: 6,
  mt: [6, 6, 0],
})`
`;

const ButtonLink = styled(GenericButtonLink).attrs({
  f: 3,
  ml: 6,
  mt: [6, 6, 0],
})`
`;

const __Confirm__ = ({ resendConfirmationEmail, ...rest }) => {
  const [mode, setMode] = useState('resting');

  return (
    <Banner bg="state.neutral" color="gray.base" iconName="Clipboard" isCloseable={false} {...rest}>
      <Box>
        Please check your email to confirm your account.
        {' '}
        Haven’t received an email yet?
      </Box>

      <Button
        disabled={mode === 'sent'}
        onClick={() => {
          setMode('sending');
          resendConfirmationEmail()
            .then(() => setMode('sent'))
            .catch(() => setMode('error'));
        }}
      >
        {{
          resting: 'Resend email',
          sending: 'Sending...',
          sent: 'Sent',
          error: 'Error',
        }[mode]}
      </Button>
    </Banner>
  );
};

__Confirm__.propTypes = {
  resendConfirmationEmail: PropTypes.func.isRequired,
};

export const Confirm = graphql(resendConfirmationEmailMutation, {
  name: 'resendConfirmationEmail',
})(__Confirm__);

export const Bookmarklet = props => (
  <Banner bg="state.neutral" color="gray.base" iconName="Question" {...props}>
    <Box>
      Save content from any website with the Are.na bookmarklet.
    </Box>

    <ButtonLink href="/tools/bookmarklet">
      Install
    </ButtonLink>
  </Banner>
);

export const Invite = props => (
  <Banner bg="state.neutral" color="gray.base" iconName="Info" {...props}>
    <Box>
      Invite friends to collaborate on Are.na.
    </Box>

    <ButtonLink href="/tools/send-invitation">
      Send invite
    </ButtonLink>
  </Banner>
);

export const ProposePremium = props => (
  <Banner bg="state.premium" color="white" iconName="Exclaim" {...props}>
    <Box>
      Get 25% off Are.na Premium with the coupon code{' '}

      <Text display="inline" font="mono" color="white">
        flower
      </Text>
    </Box>

    <ButtonLink
      color="white"
      href="/settings/billing"
    >
      Learn more
    </ButtonLink>
  </Banner>
);

export const StronglyProposePremium = props => (
  <Banner bg="state.premium" color="white" iconName="Exclaim" {...props}>
    You’ve run out of free private blocks. Please&nbsp;

    <a href="/settings/billing">
      upgrade to Premium
    </a>

    &nbsp;to keep working privately.
  </Banner>
);

const __LoggedOutExplore__ = ({ isLoggedIn, ...rest }) =>
  (!isLoggedIn ? (
    <Banner bg="white" borderTop="3px solid" borderColor="gray.light" isCloseable={false} {...rest}>
      <Text f={5} fontWeight="normal">
        Make channels, add content, connect ideas.
      </Text>

      <ButtonLink href="/sign_up">
        Sign up
      </ButtonLink>
    </Banner>
  ) : null);

__LoggedOutExplore__.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export const LoggedOutExplore = WithLoginStatus(__LoggedOutExplore__);

const __LoggedOutProfile__ = (({ isLoggedIn, name, ...rest }) =>
  (!isLoggedIn ? (
    <Banner
      bg="white"
      borderTop="3px
      solid"
      borderColor="gray.light"
      isCloseable={false}
      {...rest}
    >
      <Text f={5} fontWeight="normal">
        Join Are.na to follow
        {' '}

        <Truncate length={40}>
          {name}
        </Truncate>
      </Text>

      <ButtonLink href="/sign_up">
        Sign up
      </ButtonLink>

      <ButtonLink href="/explore">
        Explore
      </ButtonLink>
    </Banner>
  ) : null));

__LoggedOutProfile__.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export const LoggedOutProfile = WithLoginStatus(__LoggedOutProfile__);

export default {
  STRONGLY_PROPOSE_PREMIUM: StronglyProposePremium,
  PROPOSE_PREMIUM: ProposePremium,
  CONFIRM: Confirm,
  BOOKMARKLET: Bookmarklet,
  INVITE: Invite,
  LOGGED_OUT_EXPLORE: LoggedOutExplore,
  LOGGED_OUT_PROFILE: LoggedOutProfile,
};
