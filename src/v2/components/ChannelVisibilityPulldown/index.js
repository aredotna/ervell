import React from 'react';
import PropTypes from 'prop-types';

import Pulldown from 'v2/components/UI/Pulldown';
import ChannelVisibilityPulldownOption from 'v2/components/ChannelVisibilityPulldown/components/ChannelVisibilityPulldownOption';

const explanations = {
  USER: {
    PUBLIC: 'Everyone can view the channel and anyone logged-in can add to it.',
    CLOSED: 'Everyone can view the channel but only you and your collaborators can add to it.',
    PRIVATE: 'Only you and your collaborators can view and add to the channel.',
  },
  GROUP: {
    PUBLIC: 'Everyone can view the channel and anyone logged-in can add to it.',
    CLOSED: 'Everyone can view the channel but only your group can add to it.',
    PRIVATE: 'Only you and your group can view and add to the channel. Groups with only private channels are kept secret.',
  },
};


const ChannelVisibilityPulldown = ({ value, onChange, type }) => (
  <Pulldown
    value={value}
    onChange={onChange}
    options={{
      PUBLIC: <ChannelVisibilityPulldownOption
        label="Open"
        visibility="public"
        description="anyone can add"
        explanation={explanations[type].PUBLIC}
      />,
      CLOSED: <ChannelVisibilityPulldownOption
        label="Closed"
        visibility="closed"
        description="only collaborators can add"
        explanation={explanations[type].CLOSED}
      />,
      PRIVATE: <ChannelVisibilityPulldownOption
        label="Private"
        visibility="private"
        description="only collaborators can view / add"
        explanation={explanations[type].PRIVATE}
      />,
    }}
  />
);

ChannelVisibilityPulldown.propTypes = {
  value: PropTypes.oneOf(['PUBLIC', 'CLOSED', 'PRIVATE']),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['USER', 'GROUP']),
};

ChannelVisibilityPulldown.defaultProps = {
  value: 'PUBLIC',
  type: 'USER',
};

export default ChannelVisibilityPulldown;
