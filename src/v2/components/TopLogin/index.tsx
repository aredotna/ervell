import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import constants from 'v2/styles/constants'
import { TopSignupLoginButtons } from '../TopSignupLoginButtons'

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${constants.z.header};

  padding: 50px;

  ${constants.media.large`
    padding: 3vw;
  `}
`

export const TopLogin: React.FC = () => {
  return (
    <Container>
      <Box flex={1}></Box>

      <TopSignupLoginButtons />
    </Container>
  )
}
