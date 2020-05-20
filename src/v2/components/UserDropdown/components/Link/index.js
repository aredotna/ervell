import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { mixin } from 'v2/components/UI/Text'

const Anchor = styled.a.attrs({
  display: 'block',
  role: 'button',
  tabIndex: 0,
})`
  ${mixin}
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:hover > * {
    color: ${props => props.theme.colors.gray.bold};
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
