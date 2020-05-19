import React, { useCallback } from 'react'
import Cookies from 'cookies-js'
import styled from 'styled-components'

import { NavLink, LinkProps } from 'react-router-dom'

const Link = styled(NavLink)`
  display: block;
  color: ${props => props.theme.colors.gray.regular} !important;

  &:hover {
    color: ${props => props.theme.colors.gray.bold} !important;
  }

  ${({ isActive, theme }) =>
    isActive &&
    isActive() &&
    `
    color: ${theme.colors.gray.semiBold} !important;
    cursor: default;
  `}
`

interface CookieLinkUnlessCurrentProps {
  name: string
  value: string
  prefix: string
  isActive?: () => boolean
}

const CookieLinkUnlessCurrent: React.FC<CookieLinkUnlessCurrentProps &
  LinkProps> = ({ name, value, prefix, ...rest }) => {
  const setCookie = useCallback(() => {
    if (!name || !value) return

    try {
      Cookies.set(`${prefix}--${name}`, value)
    } catch (err) {
      console.error(err)
    }
  }, [name, value, prefix])

  return <Link {...rest} onClick={setCookie} />
}

export default CookieLinkUnlessCurrent
