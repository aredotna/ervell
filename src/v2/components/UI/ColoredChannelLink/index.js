import React from 'react'
import PropTypes from 'prop-types'

import colors from 'v2/styles/colors'

const ColoredChannelLink = ({ href, children, visibility, ...rest }) => (
  <a href={href} style={{ color: colors.channel[visibility] }} {...rest}>
    {children}
  </a>
)

ColoredChannelLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  visibility: PropTypes.string.isRequired,
}

export default ColoredChannelLink
