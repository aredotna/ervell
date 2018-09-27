import styled, { css } from 'styled-components';
import { display, space, textColor, fontFamily, fontWeight, fontStyle, fontSize, lineHeight, textAlign, width } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased, neutralMarginsY } from 'react/styles/mixins';

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
  ${neutralMarginsY}

  a {
    color: inherit;
    text-decoration: none;

    ${x => x.underlineLinks && `
      text-decoration: underline;
    `}
  }

  > p {
    ${neutralMarginsY}
  }
`;

export default styled.div`
  ${mixin}
`;
