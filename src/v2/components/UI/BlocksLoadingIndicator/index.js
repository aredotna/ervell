import styled from 'styled-components'

import constants from 'v2/styles/constants'
import { multiply } from 'v2/styles/functions'

import LoadingIndicator from 'v2/components/UI/LoadingIndicator'

const { blockGutter, blockWidth } = constants

export default styled(LoadingIndicator).attrs({
  width: '100%',
  height: blockWidth,
  pb: multiply(blockGutter, 2),
})`
  min-width: 100%;
`
