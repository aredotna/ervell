import React from 'react';
import PropTypes from 'prop-types';

import Pulldown from 'react/components/UI/Pulldown';
import ChannelVisibilityPulldownOption from 'react/components/ChannelVisibilityPulldown/components/ChannelVisibilityPulldownOption';

const ChannelVisibilityPulldown = ({ value, onChange }) => (
  <Pulldown
    value={value}
    onChange={onChange}
    options={{
      open: <ChannelVisibilityPulldownOption
        label="Open"
        visibility="open"
        description="anyone can add"
        explanation="Everyone can view the channel and anyone logged-in can add to it."
      />,
      closed: <ChannelVisibilityPulldownOption
        label="Closed"
        visibility="closed"
        description="only collaborators can add"
        explanation="Everyone can view the channel but only you and your collaborators can add to it."
      />,
      private: <ChannelVisibilityPulldownOption
        label="Private"
        visibility="private"
        description="only collaborators can view"
        explanation="Only you and your collaborators can view and add to the channel."
      />,
    }}
  />
);

ChannelVisibilityPulldown.propTypes = {
  value: PropTypes.oneOf(['open', 'closed', 'private']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChannelVisibilityPulldown;
