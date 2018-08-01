import React from 'react';
import PropTypes from 'prop-types';
import Text from 'react/components/UI/Text';
import CTAButton from 'react/components/Onboarding/components/UI/CTAButton';

const Welcome = props => {
  const { goForward } = props;

  return (
    <div>
      <Text f={9} my={4}>
        Welcome to Are.na!
      </Text>
      <Text f={9} my={4}>
        Let’s make your first channel.
      </Text>
      <CTAButton onClick={goForward}>
        Next
      </CTAButton>
    </div>
  );
};


Welcome.propTypes = {
  goForward: PropTypes.func.isRequired
};

Welcome.defaultProps = {};

export default Welcome;
