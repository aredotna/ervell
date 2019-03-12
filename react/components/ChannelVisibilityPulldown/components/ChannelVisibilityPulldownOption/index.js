import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import LockIconWithBorder from 'react/components/UI/LockIconWithBorder';

const Container = styled.div`
  position: relative;
`;

const Check = styled(Text)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const ChannelVisibilityPulldownOption = ({
  mode, purpose, selected, visibility, label, description, explanation,
}) => (
  <Container>
    {purpose === 'value' &&
      <Text color={mode === 'resting' ? `channel.${visibility}` : 'gray.medium'}>
        {label} - {description}
      </Text>
    }

    {purpose === 'option' &&
      <div>
        <Text color={`channel.${visibility}`} mb={2}>
          {label}
          {visibility === 'private' &&
            <LockIconWithBorder ml={3} />
          }
        </Text>

        <Text color="gray.medium" f={3} pr={8}>
          {explanation}
        </Text>

        {selected &&
          <Check f={6} color={`channel.${visibility}`}>✓</Check>
        }
      </div>
    }
  </Container>
);

ChannelVisibilityPulldownOption.propTypes = {
  mode: PropTypes.string,
  purpose: PropTypes.string,
  selected: PropTypes.bool,
  visibility: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
};

ChannelVisibilityPulldownOption.defaultProps = {
  mode: 'resting',
  purpose: 'value',
  selected: false,
};

export default ChannelVisibilityPulldownOption;
