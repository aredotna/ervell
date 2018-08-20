import styled from 'styled-components';
import { display, width, space, fontSize, fontFamily, lineHeight, textColor, textAlign, alignSelf } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

export default styled.label`
  all: initial;
  display: block;
  cursor: default;

  ${display}
  ${width}
  ${preset(space, { my: 2 })}
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 2 })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${textAlign}
  ${alignSelf}
  ${antialiased}

  a {
    text-decoration: underline;
    ${preset(textColor, { color: 'gray.base' })}
  }
`;
