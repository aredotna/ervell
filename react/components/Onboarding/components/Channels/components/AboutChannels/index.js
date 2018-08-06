import React from 'react';
import PropTypes from 'prop-types';
import CTAText from 'react/components/Onboarding/components/UI/CTAText';
import CTAButton from 'react/components/Onboarding/components/UI/CTAButton';

const AboutChannels = props => {
  const { goForward } = props;

  return (
    <div>
      <CTAText>
        Channels are collections of content built around an idea.
      </CTAText>
      <CTAText>
        Channels can be public of private. Let’s keep this one private for now.
      </CTAText>
      <CTAButton onClick={goForward}>
        Got it
      </CTAButton>
    </div>
  );
};

AboutChannels.propTypes = {
  goForward: PropTypes.func.isRequired
};

export default AboutChannels;
