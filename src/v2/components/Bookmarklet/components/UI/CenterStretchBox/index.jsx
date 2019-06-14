import styled from 'styled-components'
import Box from 'v2/components/UI/Box'

const CenterStretchBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex: 1;
  position: relative;
  max-width: 100%;
`

export default CenterStretchBox
