import React from 'react';
import PropTypes from 'prop-types';

import Colors from 'react/styles/Colors';

const ColoredChannelLink = ({
  href, title, visibility, ...rest
}) => (
  <a href={href} style={{ color: Colors.channel[visibility] }} {...rest}>
    {title}
  </a>
);

ColoredChannelLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
};

export default ColoredChannelLink;
