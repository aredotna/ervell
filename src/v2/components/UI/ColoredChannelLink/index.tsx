import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface ColoredChannelLinkProps {
  href?: string
  visibility?: string
  as?: any
  to?: any
  state?: any
}

const ColoredLink = styled<{ visibility: boolean }>(Link)`
  color: ${props => props.theme.colors.channel[props.visibility]} !important;
`

const ColoredChannelLink: React.FC<ColoredChannelLinkProps> = ({
  href,
  children,
  visibility,
  state,
  ...rest
}) => (
  <ColoredLink to={href} state={state} visibility={visibility} {...rest}>
    {children}
  </ColoredLink>
)

export default ColoredChannelLink
