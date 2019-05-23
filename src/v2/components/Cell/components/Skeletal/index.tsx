import styled from 'styled-components'

import constants from 'v2/styles/constants'
import colors from 'v2/styles/colors'

import Box from 'v2/components/UI/Box'

const Skeletal = styled(Box).attrs({
  mb: 8,
  p: 6,
  border: '1px solid',
  borderColor: 'gray.light',
  borderRadius: '1px',
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: ${constants.blockWidth};
  height: ${constants.blockWidth};

  &:after,
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    content: '';
    width: 150%;
    height: 1px;
    background-color: ${colors.gray.light};
    transform-origin: 0 0;
  }

  &:after {
    transform: rotate(45deg) translate(-50%, -50%);
  }

  &:before {
    transform: rotate(-45deg) translate(-50%, -50%);
  }
`

export default Skeletal
