import React from 'react';
import PropTypes from 'prop-types';
import Text from 'react/components/UI/Text';
import CTAButton from 'react/components/Onboarding/components/UI/CTAButton';

const CreateChannel = props => {
  const { } = props;

  return (
    <div>
      <Text f={9} my={4}>
        First, type a channel name...
      </Text>
    </div>
  );
};

CreateChannel.propTypes = {};

CreateChannel.defaultProps = {};

export default CreateChannel;
