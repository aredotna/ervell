import React from 'react';
import PropTypes from 'prop-types';

import Pulldown from 'react/components/UI/Pulldown';
import ChannelVisibilityPulldownOption from 'react/components/ChannelVisibilityPulldown/components/ChannelVisibilityPulldownOption';

const ChannelVisibilityPulldown = ({ value, onChange }) => (
  <Pulldown
    value={value}
    onChange={onChange}
    options={{
      PUBLIC: <ChannelVisibilityPulldownOption
        label="Open"
        visibility="public"
        description="anyone can add"
        explanation="Everyone can view the channel and anyone logged-in can add to it."
      />,
      CLOSED: <ChannelVisibilityPulldownOption
        label="Closed"
        visibility="closed"
        description="only collaborators can add"
        explanation="Everyone can view the channel but only you and your collaborators can add to it."
      />,
      PRIVATE: <ChannelVisibilityPulldownOption
        label="Private"
        visibility="private"
        description="only collaborators can view / add"
        explanation="Only you and your collaborators can view and add to the channel."
      />,
    }}
  />
);

ChannelVisibilityPulldown.propTypes = {
  value: PropTypes.oneOf(['PUBLIC', 'CLOSED', 'PRIVATE']),
  onChange: PropTypes.func.isRequired,
};

ChannelVisibilityPulldown.defaultProps = {
  value: 'PUBLIC',
};

export default ChannelVisibilityPulldown;
