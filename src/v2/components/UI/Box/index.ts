import styled, { css } from 'styled-components'
import {
  alignItems,
  AlignItemsProps,
  alignSelf,
  bgColor,
  BgColorProps,
  borderColor,
  BorderColorProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  BordersProps,
  bottom,
  BottomProps,
  display,
  DisplayProps,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  height,
  justifyContent,
  JustifyContentProps,
  left,
  LeftProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  position,
  PositionProps,
  right,
  RightProps,
  space,
  SpaceProps,
  style,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  zIndex,
  ZIndexProps,
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

export interface BoxProps
  extends React.HTMLProps<HTMLDivElement>,
    DisplayProps,
    PositionProps,
    SpaceProps,
    AlignItemsProps,
    MinHeightProps,
    MaxHeightProps,
    MinWidthProps,
    MaxWidthProps,
    JustifyContentProps,
    FlexDirectionProps,
    BordersProps,
    BorderColorProps,
    BorderRadiusProps,
    BgColorProps,
    TextAlignProps,
    FlexProps,
    TopProps,
    RightProps,
    BottomProps,
    LeftProps,
    ZIndexProps {}

export default styled.div<BoxProps>`
  ${mixin}
`
