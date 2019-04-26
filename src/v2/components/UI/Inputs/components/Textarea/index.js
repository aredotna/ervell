import styled, { css } from 'styled-components'
import { lineHeight } from 'styled-system'

import { preset } from 'v2/styles/functions'

import inputMixin from 'v2/components/UI/Inputs/mixin'

export const mixin = css`
  ${inputMixin}
  ${preset(lineHeight, { lineHeight: 1 })}
  resize: ${props => props.resize};
  white-space: pre-wrap;
`

const Textarea = styled.textarea`
  ${mixin}
`

Textarea.defaultProps = {
  resize: 'vertical',
}

export default Textarea
