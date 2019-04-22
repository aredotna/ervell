import React from 'react';
import PropTypes from 'prop-types';

import colors from 'react/styles/colors';

const ColoredChannelSpan = ({
  children, visibility, ...rest
}) => (
  <span style={{ color: colors.channel[visibility] }} {...rest}>
    {children}
  </span>
);

ColoredChannelSpan.propTypes = {
  children: PropTypes.node.isRequired,
  visibility: PropTypes.string.isRequired,
};

export default ColoredChannelSpan;
