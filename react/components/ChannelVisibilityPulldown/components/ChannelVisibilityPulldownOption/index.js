import React from 'react';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';

const ChannelVisibilityPulldownOption = ({
  mode, visibility, label, description, explanation,
}) => (
  <div>
    {mode === 'resting' &&
      <Text color={`channel.${visibility}`}>
        {label} - {description}
      </Text>
    }

    {mode === 'expanded' &&
      <div>
        <Text color={`channel.${visibility}`} mb={2}>{label}</Text>
        <Text color="gray.medium" f={3}>{explanation}</Text>
      </div>
    }
  </div>
);

ChannelVisibilityPulldownOption.propTypes = {
  mode: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
};

export default ChannelVisibilityPulldownOption;
