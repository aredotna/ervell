import React from 'react'
import styled from 'styled-components'

import { Box } from 'v2/components/UI/Box'
import { Text } from 'v2/components/UI/Text'
import { GenericButton } from 'v2/components/UI/GenericButton'

const Button = styled(GenericButton).attrs({
  py: 6,
  f: 4,
  bg: 'background',
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

const Message = styled(Text)`
  a {
    text-decoration: underline;
  }
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
      <Box p={6} mt={5}>
        <Message f={3} align="center">
          Download our{' '}
          <a
            href="https://www.are.na/tools/bookmarklet"
            target="_blank"
            rel="noopener noreferrer"
          >
            official browser extension
          </a>{' '}
          to bypass this check.
        </Message>
        {/* Some browsers block iframes from opening new tabs, so show the URL as well. */}
        <Message f={3} align="center" mt={6}>
          <a
            href="https://www.are.na/tools/bookmarklet"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.are.na/tools/bookmarklet
          </a>
        </Message>
      </Box>
    </Container>
  )
}
