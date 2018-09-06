import styled, { css } from 'styled-components';
import { display, space, textColor, fontFamily, fontWeight, fontStyle, fontSize, lineHeight, textAlign, width } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased, neutralMarginsY } from 'react/styles/mixins';

export const mixin = css`
  box-sizing: border-box;
  ${display}
  ${width}
  ${space}
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 4 })}
  ${fontWeight}
  ${fontStyle}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${textAlign}
  ${antialiased}
  ${neutralMarginsY}

  a {
    color: inherit;
    text-decoration: none;

    ${x => x.underlineLinks && `
      text-decoration: underline;
    `}
  }
`;

export default styled.div`
  ${mixin}
`;
