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
  srcs: string[]
  alt?: string
}

export const KonnectableImg: React.FC<Props> = ({ src, srcs, alt = null }) => (
  <Container>
    <img
      src={srcs.length > 0 ? srcs[0] : src}
      srcSet={
        srcs.length > 0 ? `${srcs[0]} 1x, ${srcs[1]} 2x, ${srcs[2]} 3x,` : null
      }
      alt={alt}
    />
  </Container>
)
