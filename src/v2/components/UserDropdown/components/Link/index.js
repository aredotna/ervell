import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { mixin } from 'v2/components/UI/Text'
import { Link } from 'react-router-dom'

const Anchor = styled(Link).attrs({
  display: 'block',
  role: 'button',
  tabIndex: 0,
})`
  ${mixin}
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:hover > * {
    color: black;
  }
`

const UserMenuLink = ({ children, ...rest }) => (
  <Anchor py={4} px="1rem" fontWeight="bold" {...rest}>
    {children}
  </Anchor>
)

UserMenuLink.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserMenuLink
