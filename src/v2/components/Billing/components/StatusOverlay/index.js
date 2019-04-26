import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

export default styled(Box).attrs({
  bg: 'utility.semiTranslucent',
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
