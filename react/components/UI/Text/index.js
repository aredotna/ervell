import styled, { css } from 'styled-components';
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
  themeGet,
} from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased, neutralMarginsY, hyphenate, breakWord } from 'react/styles/mixins';

export const baseMixin = css`
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${antialiased}
`;

export const mixin = css`
  box-sizing: border-box;
  ${baseMixin}
  ${display}
  ${width}
  ${space}
  ${fontWeight}
  ${fontStyle}
  ${textAlign}
  ${props => props.neutralMarginsY && neutralMarginsY}
  ${props => props.hyphenate && hyphenate}
  ${props => props.breakWord && breakWord}

  a {
    color: inherit;
    text-decoration: none;

    ${props => props.underlineLinks && `
      text-decoration: underline;
    `}

    ${props => props.hoverLinks && `
      &:hover {
        color: ${themeGet(`colors.${props.hoverLinks.color}`, 'inherit')(props)};
      }
    `}
  }

  > h1,
  > h2,
  > h3,
  > h4 {
    font-size: 1rem;
    ${neutralMarginsY}
  }

  > p {
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
`;

const Text = styled.div`
  ${mixin}
`;

Text.defaultProps = {
  neutralMarginsY: true,
};

export default Text;
