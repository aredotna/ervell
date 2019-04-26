import styled from 'styled-components'
import { fontSize } from 'styled-system'

export const optionLinkHorizontalPadding = '0.5em'
export const optionLinkVerticalPadding = '0.33em'
export const optionLinkPadding = `${optionLinkVerticalPadding} ${optionLinkHorizontalPadding}`

export default styled.a`
  display: block;
  padding: ${optionLinkPadding};
  font-weight: bold;
  ${fontSize}
`
