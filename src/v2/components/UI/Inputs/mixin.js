import { css } from 'styled-components'
import {
  fontSize,
  fontFamily,
  space,
  borderColor,
  borders,
  color,
  width,
} from 'styled-system'

import { preset } from 'v2/styles/functions'
import { antialiased } from 'v2/styles/mixins'
import { LINE_HEIGHTS } from 'v2/styles/text'

export const outlinelessMixin = css`
  ${props =>
    props.outlineless &&
    `
  outline: none;
`}
`

export const borderlessMixin = css`
  ${props =>
    props.borderless &&
    `
    background-color: transparent;
    border-color: transparent;
    padding: 0;
  `}
`

export const errorMixin = css`
  ${props =>
    props.hasError &&
    `
    &, &:focus {
      border-color: ${props.theme.colors.state.alert};
    }
  `}
`

export const focusMixin = css`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.gray.bold};
  ${preset(borders, { border: '1px solid' })}
  ${preset(borderColor, { borderColor: 'gray.bold' })}
  ${color}
  ${borderlessMixin}
`

export const defaultMixin = css`
  appearance: none;
  box-sizing: border-box;
  display: block;
  background-color: ${props => props.theme.colors.background};
  line-height: ${LINE_HEIGHTS.input};
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(width, { width: '100%' })}
  ${preset(color, { color: 'gray.bold' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(space, { px: 5, py: 4 })}
  ${preset(borders, { border: '1px solid' })}
  ${preset(borderColor, { borderColor: 'gray.medium' })}
  ${antialiased}

  ::placeholder {
    ${preset(color, { color: 'gray.bold' })}
    opacity: 0.5;
    font-family: inherit;
  }

  ${props => props.focus && focusMixin}
  &:focus {
    ${focusMixin}
  }

  ${props =>
    props.disabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}

  ${errorMixin}
  ${borderlessMixin}
  ${outlinelessMixin}
`

export default defaultMixin
