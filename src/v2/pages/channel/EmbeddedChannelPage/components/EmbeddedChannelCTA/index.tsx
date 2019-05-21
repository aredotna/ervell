import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { DividerButton } from 'v2/components/UI/Buttons'

const Container = styled(Box).attrs({
  px: 6,
})`
  display: flex;
  width: 100%;
  height: ${props => props.theme.constantValues.topBarHeight};
  flex-shrink: 0;
`

export const EmbeddedChannelCTA = ({ channel }) => {
  return (
    <Container>
      <DividerButton as="a" href={channel.href} target="_blank">
        Go to channel
      </DividerButton>
    </Container>
  )
}
