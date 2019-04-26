import styled from 'styled-components'
import {
  display,
  width,
  space,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  textColor,
  textAlign,
  alignSelf,
} from 'styled-system'

import { preset } from 'v2/styles/functions'
import { antialiased } from 'v2/styles/mixins'

export default styled.label`
  all: initial;
  display: block;
  cursor: default;

  ${display}
  ${width}
  ${preset(space, { my: 2 })}
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(fontSize, { f: 2 })}
  ${preset(fontWeight, { fontWeight: 'bold' })}
  ${preset(lineHeight, { lineHeight: 1 })}
  ${preset(textColor, { color: 'gray.base' })}
  ${textAlign}
  ${alignSelf}
  ${antialiased}

  a {
    text-decoration: underline;
    ${preset(textColor, { color: 'gray.base' })}
  }
`
