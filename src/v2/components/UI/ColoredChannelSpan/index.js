import React from 'react'
import PropTypes from 'prop-types'

import colors from 'v2/styles/colors'

const ColoredChannelSpan = ({ children, visibility, ...rest }) => (
  <span style={{ color: colors.channel[visibility] }} {...rest}>
    {children}
  </span>
)

ColoredChannelSpan.propTypes = {
  children: PropTypes.node,
  visibility: PropTypes.string.isRequired,
}

export default ColoredChannelSpan
