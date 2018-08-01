import React from 'react';
import PropTypes from 'prop-types';
import Text from 'react/components/UI/Text';
import CTAButton from 'react/components/Onboarding/components/UI/CTAButton';

const AboutChannels = props => {
  const { goForward } = props;

  return (
    <div>
      <Text f={9} my={4}>
        Channels are collections of content built around an idea.
      </Text>
      <Text f={9} my={4}>
        Channels can be public of private. Let’s keep this one private for now.
      </Text>
      <CTAButton onClick={goForward}>
        Got it
      </CTAButton>
    </div>
  );
};

AboutChannels.propTypes = {
  goForward: PropTypes.func.isRequired
};

AboutChannels.defaultProps = {};

export default AboutChannels;
