import React from 'react';
import PropTypes from 'prop-types';
import Text from 'react/components/UI/Text';
import ChannelNameInput from 'react/components/Onboarding/components/UI/ChannelNameInput';

const CreateChannel = props => {
  const { } = props;

  return (
    <div>
      <Text f={9} my={4}>
        First, type a channel name...
      </Text>
      <ChannelNameInput/>
    </div>
  );
};

CreateChannel.propTypes = {};

CreateChannel.defaultProps = {};

export default CreateChannel;
