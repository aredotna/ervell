import styled, { css } from 'styled-components'
import {
  display,
  DisplayProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  width,
  height,
  alignItems,
  AlignItemsProps,
  alignSelf,
  minHeight,
  MinHeightProps,
  maxHeight,
  MaxHeightProps,
  minWidth,
  MinWidthProps,
  maxWidth,
  MaxWidthProps,
  justifyContent,
  JustifyContentProps,
  flexDirection,
  FlexDirectionProps,
  borders,
  BordersProps,
  borderColor,
  BorderColorProps,
  borderRadius,
  BorderRadiusProps,
  bgColor,
  BgColorProps,
  textAlign,
  TextAlignProps,
  flex,
  FlexProps,
  style,
  top,
  TopProps,
  right,
  RightProps,
  bottom,
  BottomProps,
  left,
  LeftProps,
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
