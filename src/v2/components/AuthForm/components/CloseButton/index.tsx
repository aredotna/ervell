import React from 'react'
import styled from 'styled-components'

import Icons from 'v2/components/UI/Icons'

const Container = styled.a`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: ${x => x.theme.space[6]};
  cursor: pointer;
`

interface Props {
  onClose?: () => void
}

const CloseButton: React.FC<Props> = ({ onClose }) => {
  const onClick = onClose ? onClose : () => (location.href = '/')

  return (
    <Container onClick={onClick}>
      <Icons name="X" color="gray.base" />
    </Container>
  )
}

export default CloseButton
