import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

const FixedWrapper = styled(Box)`
  position: fixed;
  ${props => props.top && 'top: 0;'}
  ${props => props.bottom && 'bottom: 0;'}
  right: 0;
  left: 0;
  z-index: ${props => props.zIndex || 1};
`

FixedWrapper.defaultProps = {
  bg: 'background',
}

export default FixedWrapper
