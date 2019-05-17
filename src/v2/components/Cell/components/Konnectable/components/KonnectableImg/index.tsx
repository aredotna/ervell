import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

const Container = styled(Box).attrs({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
`

interface Props {
  src: string
  alt?: string
}

export const KonnectableImg: React.FC<Props> = ({ src, alt = null }) => (
  <Container>
    <img src={src} alt={alt} />
  </Container>
)
