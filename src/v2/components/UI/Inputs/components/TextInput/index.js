import styled from 'styled-components'

import mixin from 'v2/components/UI/Inputs/mixin'

export default styled.input`
  ${mixin}
  background-color: ${props => props.theme.colors.background};
`
