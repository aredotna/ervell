import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Overlay from 'v2/components/UI/Overlay'
import UserAvatar from 'v2/components/UserAvatar'
import UserDropdown from 'v2/components/UserDropdown'
import { SerializeMeQuery_serializedMe } from '__generated__/SerializeMeQuery'

const Container = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

interface MyRepresentationProps {
  me: SerializeMeQuery_serializedMe
  onOpen?: () => void
  onClose?: () => void
}

const MyRepresentation: React.FC<MyRepresentationProps & BoxProps> = ({
  me,
  onOpen,
  onClose,
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'open' | 'closing'>('resting')
  const containerRef = useRef(null)

  const handleClick = useCallback(() => {
    if (mode == 'closing') return
    setMode('open')
    if (onOpen) onOpen()
  }, [])

  const handleClose = useCallback(() => {
    setMode('closing')
    setTimeout(() => {
      setMode('resting')
      if (onClose) onClose()
    }, 100)
  }, [])

  return (
    <React.Fragment>
      <Container {...rest} onClick={handleClick} ref={containerRef}>
        <UserAvatar size={30} user={{ ...me, href: null }} />
      </Container>

      {mode === 'open' && (
        <Overlay
          onClose={handleClose}
          targetEl={() => containerRef.current}
          alignToY="bottom"
          alignToX="right"
          anchorY="top"
          anchorX="right"
          offsetY={0}
          offsetX={10}
          marginY={10}
        >
          <UserDropdown />
        </Overlay>
      )}
    </React.Fragment>
  )
}

export default MyRepresentation
