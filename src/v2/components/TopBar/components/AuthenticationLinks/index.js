import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Container = styled(Box)`
  display: flex;
  align-items: center;
`

export default props => (
  <Container {...props}>
    <Text f={3}>
      <strong>
        <a href="/sign_up">Sign up</a>
      </strong>

      {' or '}

      <strong>
        <a href="/log_in">Log in COMPONENT</a>
      </strong>
    </Text>
  </Container>
)
