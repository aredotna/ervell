import styled from 'styled-components'

import { multiply, add } from 'v2/styles/functions'
import constants from 'v2/styles/constants'

import Box from 'v2/components/UI/Box'

const BREAKPOINTS = new Array(12)
  .fill(undefined)
  .map((_, i) => {
    const maxWidth = multiply(constants.blockAndGutter, i + 1)
    const minWidth = add(constants.legacyUnit, maxWidth)
    return `@media (min-width: ${minWidth}) { max-width: ${maxWidth}; }`
  })
  .join('')

const Constrain = styled(Box)`
  ${BREAKPOINTS}
`

Constrain.defaultProps = {
  my: 0,
  mx: 'auto',
}

export default Constrain
