import React from 'react'

import colors from 'v2/styles/colors'

interface ColoredChannelLinkProps {
  href?: string
  visibility?: string
}

const ColoredChannelLink: React.FC<ColoredChannelLinkProps> = ({
  href,
  children,
  visibility,
  ...rest
}) => (
  <a href={href} style={{ color: colors.channel[visibility] }} {...rest}>
    {children}
  </a>
)

export default ColoredChannelLink
