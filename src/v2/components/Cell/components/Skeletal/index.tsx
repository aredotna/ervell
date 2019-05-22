import styled from 'styled-components'

import constants from 'v2/styles/constants'
import colors from 'v2/styles/colors'

import Box from 'v2/components/UI/Box'

const Skeletal = styled(Box).attrs({
  mb: 8,
  p: 6,
  border: '1px solid',
  borderColor: 'gray.light',
})`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${constants.blockWidth};
  height: ${constants.blockWidth};

  &:after {
    display: block;
    content: '●';
    color: ${colors.gray.semiLight};
  }
`

export default Skeletal
