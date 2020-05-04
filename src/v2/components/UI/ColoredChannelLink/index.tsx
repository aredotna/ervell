import React from 'react'
import { Link } from 'react-router-dom'

import colors from 'v2/styles/colors'

interface ColoredChannelLinkProps {
  href?: string
  visibility?: string
  as?: any
  to?: any
}

const ColoredChannelLink: React.FC<ColoredChannelLinkProps> = ({
  href,
  children,
  visibility,
  ...rest
}) => (
  <Link to={href} style={{ color: colors.channel[visibility] }} {...rest}>
    {children}
  </Link>
)

export default ColoredChannelLink
