import styled, { css } from 'styled-components'
import {
  themeGet,
  fontSize,
  space,
  alignSelf,
  display,
  alignItems,
  justifyContent,
  bgColor,
} from 'styled-system'
import chroma from 'chroma-js'

import {
  defaultTo,
  preset,
  translucentGray,
  translucentWhite,
} from 'v2/styles/functions'
import { antialiased } from 'v2/styles/mixins'
import constants from 'v2/styles/constants'

export const BUTTON_DEFAULT_FONT_SIZE = 3
export const BUTTON_VARIANTS = { LARGE: 'LARGE', SMALL: 'SMALL' }
export const BUTTON_LARGE_PADDING = { px: 8, py: 4 }
export const BUTTON_SMALL_PADDING = { px: 6, py: 4 }
export const BUTTON_SMALL_BORDER_WIDTH = '1px'
export const BUTTON_LARGE_BORDER_WIDTH = '2px'
export const BUTTON_BORDER_RADIUS = constants.radii.button

export const buttonSize = x =>
  defaultTo(x.f, x.fontSize) < BUTTON_DEFAULT_FONT_SIZE
    ? BUTTON_VARIANTS.SMALL
    : BUTTON_VARIANTS.LARGE

export const buttonColor = props => {
  const value = themeGet(
    `colors.${props.color}`,
    props.theme.colors.gray.base
  )(props)

  const borderColor = themeGet(
    `colors.${props.borderColor}`,
    props.theme.colors.gray.regular
  )(props)

  return `
    color: ${value};
    border-color: ${chroma.blend(value, borderColor, 'screen')};
  `
}

export const buttonPadding = x =>
  preset(
    space,
    {
      LARGE: BUTTON_LARGE_PADDING,
      SMALL: BUTTON_SMALL_PADDING,
    }[buttonSize(x)]
  )

export const buttonBorderWidth = x =>
  ({
    LARGE: BUTTON_LARGE_BORDER_WIDTH,
    SMALL: BUTTON_SMALL_BORDER_WIDTH,
  }[buttonSize(x)])

// To-do switch function based on theme
export const activeMixin = css`
  border: ${buttonBorderWidth} solid
    ${props =>
      props.theme.name === 'default'
        ? translucentGray('bold')
        : translucentWhite('bold')};
  color: ${props =>
    props.theme.name === 'default'
      ? translucentGray('bold')
      : translucentWhite('bold')};
`

// To-do switch function based on theme
export const hoverMixin = css`
  border: ${buttonBorderWidth} solid
    ${props =>
      props.theme.name === 'default'
        ? translucentGray('medium')
        : translucentWhite('bold')};
  color: ${props =>
    props.theme.name === 'default'
      ? translucentGray('bold')
      : translucentWhite('bold')};
`

export const disabledMixin = css`
  pointer-events: none;
  opacity: 0.5;
`

export const mixin = css`
  ${preset(display, { display: 'inline-flex' })}
  ${preset(alignItems, { alignItems: 'center' })}
  ${preset(justifyContent, { justifyContent: 'center' })}
  ${preset(fontSize, { f: BUTTON_DEFAULT_FONT_SIZE })}
  ${preset(bgColor, { bg: 'background' })}
  border: ${buttonBorderWidth} solid;
  border-radius: ${BUTTON_BORDER_RADIUS};
  font-family: ${props => props.theme.fonts.sans};
  font-weight: bold;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  text-align: center;
  ${alignSelf}
  ${buttonPadding}
  ${buttonColor}
  ${antialiased}

  ${props => props.minWidth && `min-width: ${props.minWidth};`}

  ${props => props.hover && hoverMixin}
  &:hover { ${hoverMixin} }

  ${props => props.active && activeMixin}
  &:active { ${activeMixin} }

  ${props => props.disabled && disabledMixin}
`

export const GenericButtonLink = styled.a`
  ${mixin}
  text-decoration: none !important;
`

export const GenericButton = styled.button`
  ${mixin}
`

export default GenericButtonLink
