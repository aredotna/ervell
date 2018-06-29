import styled, { css } from 'styled-components';
import { display, space, textColor, fontFamily, fontSize, lineHeight, textAlign } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased, neutralMarginsY } from 'react/styles/mixins';

export const mixin = css`
  ${display}
  ${space}
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 5 })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${textAlign}
  ${antialiased}
  ${neutralMarginsY}
`;

export default styled.div`
  ${mixin}
`;
