import styled, { css } from 'styled-components'
import {
  alignItems,
  AlignItemsProps,
  display,
  DisplayProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontStyle,
  FontStyleProps,
  fontWeight,
  FontWeightProps,
  justifyContent,
  JustifyContentProps,
  lineHeight,
  LineHeightProps,
  maxWidth,
  MaxWidthProps,
  minWidth,
  MinWidthProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  textColor,
  themeGet,
  width,
} from 'styled-system'

import { preset } from 'v2/styles/functions'
import {
  antialiased,
  neutralMarginsY,
  hyphenate,
  breakWord,
  overflowEllipsis,
} from 'v2/styles/mixins'

export const baseMixin = css`
  ${antialiased}
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
`

export const mixin = css`
  box-sizing: border-box;
  ${alignItems}
  ${baseMixin}
  ${display}
  ${fontStyle}
  ${fontWeight}
  ${justifyContent}
  ${maxWidth}
  ${minWidth}
  ${space}
  ${textAlign}
  ${width}
  ${props => props.breakWord && breakWord}
  ${props => props.hyphenate && hyphenate}
  ${props => props.neutralMarginsY && neutralMarginsY}
  ${props => props.overflowEllipsis && overflowEllipsis}
  ${props => props.textTransform && `text-transform: ${props.textTransform};`}
  ${props => props.verticalAlign && `vertical-align: ${props.verticalAlign};`}

  a {
    color: inherit;
    text-decoration: none;

    ${props =>
      props.underlineLinks &&
      `
      text-decoration: underline;
    `}

    ${props =>
      props.boldLinks &&
      `
      font-weight: bold;
    `}

    ${props =>
      props.hoverLinks &&
      `
      &:hover {
        color: ${themeGet(`colors.${props.hoverLinks.color}`, 'inherit')(
          props
        )};
      }
    `}
  }

  > h1,
  > h2,
  > h3,
  > h4 {
    ${neutralMarginsY}
  }

  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > p,
  > ol,
  > ul {
    margin: ${props => props.theme.space[4]} 0;
    ${neutralMarginsY}
  }

  del {
    text-decoration: strikethrough;
  }

  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  ol,
  ul {
    list-style: disc;
    margin-left: ${props => props.theme.space[5]};
  }
`

export interface TextProps
  extends React.HTMLProps<HTMLDivElement>,
    DisplayProps,
    SpaceProps,
    FontFamilyProps,
    FontWeightProps,
    FontStyleProps,
    FontSizeProps,
    LineHeightProps,
    TextAlignProps,
    MinWidthProps,
    MaxWidthProps,
    AlignItemsProps,
    JustifyContentProps {
  breakWord?: boolean
  hyphenate?: boolean
  neutralMarginsY?: boolean
  overflowEllipsis?: boolean
  textTransform?: any
  verticalAlign?: any
  underlineLinks?: boolean
  boldLinks?: boolean
  hoverLinks?: {
    color: string
  }
}

export const Text = styled.div<TextProps>`
  ${mixin}
`

Text.defaultProps = {
  neutralMarginsY: true,
}

export default Text
