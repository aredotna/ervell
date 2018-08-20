import styled, { css } from 'styled-components';
import { display, space, textColor, fontFamily, fontSize, lineHeight, textAlign, width } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased, neutralMarginsY } from 'react/styles/mixins';

export const mixin = css`
  ${display}
  ${width}
  ${space}
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${textAlign}
  ${antialiased}
  ${neutralMarginsY}

  a {
    color: inherit;

    ${x => x.underlineLinks && `
      text-decoration: underline;
    `}
  }
`;

export default styled.div`
  ${mixin}
`;
