import React from 'react';
import PropTypes from 'prop-types';

import Colors from 'react/styles/Colors';

const ColoredChannelSpan = ({
  children, visibility, ...rest
}) => (
  <span style={{ color: Colors.channel[visibility] }} {...rest}>
    {children}
  </span>
);

ColoredChannelSpan.propTypes = {
  children: PropTypes.node.isRequired,
  visibility: PropTypes.string.isRequired,
};

export default ColoredChannelSpan;
