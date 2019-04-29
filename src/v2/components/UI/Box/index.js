import styled, { css } from 'styled-components'
import {
  display,
  position,
  space,
  width,
  height,
  alignItems,
  alignSelf,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  justifyContent,
  flexDirection,
  borders,
  borderColor,
  borderRadius,
  bgColor,
  textAlign,
  flex,
  style,
  top,
  right,
  bottom,
  left,
  zIndex,
} from 'styled-system'

import { neutralMargins, overflowScrolling } from 'v2/styles/mixins'

const flexGrow = style({ prop: 'flexGrow' })
const flexShrink = style({ prop: 'flexShrink' })

export const mixin = css`
  box-sizing: border-box;
  ${display}
  ${position}
  ${width}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${minWidth}
  ${maxWidth}
  ${space}
  ${flex}
  ${flexGrow}
  ${flexShrink}
  ${alignItems}
  ${alignSelf}
  ${justifyContent}
  ${flexDirection}
  ${borders}
  ${borderColor}
  ${borderRadius}
  ${bgColor}
  ${textAlign}
  ${neutralMargins}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex}
  ${props => props.overflowScrolling && overflowScrolling}
`

export default styled.div`
  ${mixin}
`
