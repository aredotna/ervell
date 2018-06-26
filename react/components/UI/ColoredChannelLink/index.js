import React from 'react';
import PropTypes from 'prop-types';

import colors from 'react/styles/colors';

const ColoredChannelLink = ({
  href, title, visibility, ...rest
}) => (
  <a href={href} style={{ color: colors.channel[visibility] }} {...rest}>
    {title}
  </a>
);

ColoredChannelLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
};

export default ColoredChannelLink;
