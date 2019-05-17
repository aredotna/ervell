import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { DividerButton } from 'v2/components/UI/Buttons'

const Container = styled(Box).attrs({
  px: 6,
})`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: ${props => props.theme.constantValues.topBarHeight};
  background-color: white;
  z-index: 1;
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
