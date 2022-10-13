import React from 'react'
import styled from 'styled-components'
import Box, { mixin as boxMixin } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const KeyLabel = styled(Text).attrs({
  color: 'gray.medium',
  f: 0,
})`
  display: inline;
  vertical-align: middle;
  line-height: 1;
`

const Container = styled(Box).attrs({
  py: 1,
  px: 2,
})`
  ${boxMixin}
  cursor: pointer;
  display: inline;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.background};
  border-radius: ${p => p.theme.radii.regular};
  vertical-align: middle;
`

export const Key: React.FC = ({ children }) => {
  return (
    <Container>
      <KeyLabel>{children}</KeyLabel>
    </Container>
  )
}
