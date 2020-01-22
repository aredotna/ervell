import React from 'react'
import styled from 'styled-components'

import { Box } from 'v2/components/UI/Box'
import { GenericButton } from 'v2/components/UI/GenericButton'

const Button = styled(GenericButton).attrs({
  py: 6,
  f: 4,
  bg: 'white',
})`
  &:hover {
    background-color: transparent;
  }
`

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
`

export const StorageAccessCheck: React.FC = () => {
  const onButtonClick = () => {
    if (typeof document.requestStorageAccess === 'function') {
      document.requestStorageAccess().then(
        () => {
          console.log('access granted in button')
          window.location.reload()
        },
        () => {
          console.log('access denied')
        }
      )
    }
  }

  return (
    <Container>
      <Button onClick={onButtonClick}>Load bookmarklet...</Button>
    </Container>
  )
}
