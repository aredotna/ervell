import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Overlay from 'v2/components/UI/Overlay'

import { LinkViewMode, OnLinkViewModeChange } from 'v2/components/BlockLightbox'

const BetaMessage = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'gray.regular',
  bg: 'background',
  p: 4,
})`
  border-radius: ${props => props.theme.radii.regular};
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-width: 20em;
`

const Option = styled.a`
  cursor: pointer;
  &:before {
    content: '○ ';
  }

  ${props =>
    props.selected &&
    `
    &:before {
      content: '● ';
    }
  `}
`

interface BlockLightboxSwitchViewModeProps {
  linkViewMode: LinkViewMode
  onLinkViewModeChange: OnLinkViewModeChange
}

export const BlockLightboxSwitchViewMode: React.FC<BlockLightboxSwitchViewModeProps> = ({
  linkViewMode,
  onLinkViewModeChange,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const targetEl = useRef(null)

  return (
    <>
      <Option
        onClick={() => onLinkViewModeChange('screenshot')}
        selected={linkViewMode === 'screenshot'}
      >
        Screenshot
      </Option>
      <Option
        onClick={() => onLinkViewModeChange('reader')}
        selected={linkViewMode === 'reader'}
      >
        Reader
      </Option>
      <Text
        f={1}
        color="gray.semiLight"
        display="inline"
        ref={targetEl}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setOpen(!open)
        }}
      >
        [?]
      </Text>

      {open && (
        <Overlay
          onClose={() => {
            setOpen(!open)
          }}
          alignToY="bottom"
          alignToX="right"
          anchorY="top"
          anchorX="right"
          offsetY={5}
          offsetX={0}
          disableTarget
          targetEl={() => targetEl.current}
        >
          <BetaMessage>
            <Text f={1} m={4}>
              This is an early look at an reader mode for our lifetime and
              supporter premium members. From now on, when links are saved to
              Are.na, we will automatically extract content automatically.
            </Text>
            <Text f={1} m={4}>
              Still to come: full-text search, static PDF archive of URL and
              automatic content extraction when you connect another
              person&apos;s block.
            </Text>
            <Text f={1} m={4}>
              Feel free to send us feedback or questions at{' '}
              <strong>
                <a href="mailto:help@are.na">help@are.na</a>
              </strong>
              .
            </Text>
          </BetaMessage>
        </Overlay>
      )}
    </>
  )
}
