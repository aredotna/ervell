import styled from 'styled-components'
import Box from 'src/v2/components/UI/Box'

const CenterStretchBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex: 1;
  position: relative;
`

export default CenterStretchBox
