import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface ColoredChannelLinkProps {
  href?: string
  visibility?: string
  as?: any
  to?: any
}

const ColoredLink = styled<{ visibility: boolean }>(Link)`
  color: ${props => props.theme.colors.channel[props.visibility]};
`

const ColoredChannelLink: React.FC<ColoredChannelLinkProps> = ({
  href,
  children,
  visibility,
  ...rest
}) => (
  <ColoredLink to={href} {...rest}>
    {children}
  </ColoredLink>
)

export default ColoredChannelLink
