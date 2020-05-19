import React from 'react'
import styled, { css } from 'styled-components'
import { themeGet } from 'styled-system'
import chroma from 'chroma-js'

import constants from 'v2/styles/constants'

import { mixin as buttonMixin } from 'v2/components/UI/GenericButton'

const CONTRAST_RATIO = 4.5

const color = props => {
  const bgColor = themeGet(
    `colors.${props.color}`,
    props.theme.colors.utility.translucent
  )(props)
  const textColor =
    chroma.contrast(bgColor, props.theme.colors.gray.base) > CONTRAST_RATIO
      ? props.theme.colors.gray.base
      : 'white'

  return `
    color: ${textColor};
    background-color: ${bgColor};
  `
}

export const activeMixin = css`
  border: none;
  color: ${x => x.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.background};
`

export const hoverMixin = css`
  border: none;
  color: ${props => props.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.background};
`

const mixin = css`
  ${buttonMixin}
  border: none;
  border-radius: ${constants.radii.subtle};

  ${x => x.hover && hoverMixin}
  &:hover {
    ${hoverMixin}
  }

  ${x => x.active && activeMixin}
  &:active {
    ${activeMixin}
  }

  ${color}
`

export const FilledButton = styled.button`
  ${mixin}
`

export const FilledButtonLink = styled.a`
  ${mixin}
`

export default ({ href, ...rest }) =>
  href ? <FilledButtonLink href={href} {...rest} /> : <FilledButton {...rest} />
