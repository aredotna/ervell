import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import Overlay from 'v2/components/UI/Overlay'
import Text from 'v2/components/UI/Text'
import Box from '../UI/Box'

const Message = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'state.premium',
  bg: 'background',
  p: 4,
})`
  border-radius: ${props => props.theme.radii.regular};
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-width: 20em;
`

export const FlagContent: React.FC = ({ ...rest }) => {
  const [open, setOpen] = useState<boolean>(false)
  const targetEl = useRef(null)
  const onClick = useCallback(() => {
    setOpen(!open)
  }, [])

  return (
    <>
      <span onClick={onClick} ref={targetEl} role="button" {...rest}>
        Flag
      </span>
      {open && (
        <Overlay
          onClose={() => setOpen(false)}
          targetEl={() => targetEl.current}
          align="right"
          anchorX="right"
          alignToX="right"
          alignToY="bottom"
          anchorY="top"
          offsetY={5}
          offsetX={0}
          disableTarget
        >
          <Message>
            <Text>Hello</Text>
          </Message>
        </Overlay>
      )}
    </>
  )
}
