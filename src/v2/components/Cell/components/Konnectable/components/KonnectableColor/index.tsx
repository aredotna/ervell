import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

interface KonnectableColorProps {
  color: string
}

const Container = styled(Box).attrs({
  pt: 4,
  px: 5,
})`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${props => props.color};
  text-align: left;
`

export const KonnectableColor: React.FC<KonnectableColorProps> = ({
  color,
}) => {
  return <Container color={color} />
}
