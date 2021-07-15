import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import Button from 'v2/components/UI/GenericButton'

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const TopLogin: React.FC = () => {
  return (
    <Container>
      <Box flex={1}>
        <Icons name="ArenaMark" size="1.5em" color="gray.block" />
      </Box>

      <Box>
        <Button f={1} mr={6} color="gray.block">
          Login
        </Button>
        <Button f={1} color="gray.block">
          Sign Up
        </Button>
      </Box>
    </Container>
  )
}
