import styled, { css } from 'styled-components'
import {
  display,
  space,
  textColor,
  fontFamily,
  fontWeight,
  fontStyle,
  fontSize,
  lineHeight,
  textAlign,
  width,
  minWidth,
  maxWidth,
  themeGet,
  alignItems,
  justifyContent,
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
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${antialiased}
`

export const mixin = css`
  box-sizing: border-box;
  ${baseMixin}
  ${display}
  ${width}
  ${minWidth}
  ${maxWidth}
  ${space}
  ${fontWeight}
  ${fontStyle}
  ${textAlign}
  ${alignItems}
  ${justifyContent}
  ${props => props.neutralMarginsY && neutralMarginsY}
  ${props => props.hyphenate && hyphenate}
  ${props => props.breakWord && breakWord}
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

const Text = styled.div`
  ${mixin}
`

Text.defaultProps = {
  neutralMarginsY: true,
}

export default Text
