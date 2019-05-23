import React from 'react'
import styled from 'styled-components'

import constants from 'v2/styles/constants'

import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'

const Container = styled(Grid)`
  height: ${constants.blockWidth};
  overflow: hidden;
`

export const ChannelContentsPlaceholder: React.FC = () => {
  return (
    <Container>
      <Cell.Skeletal />
      <Cell.Skeletal />
      <Cell.Skeletal />
      <Cell.Skeletal />
      <Cell.Skeletal />
      <Cell.Skeletal />
      <Cell.Skeletal />
      <Cell.Skeletal />
    </Container>
  )
}
