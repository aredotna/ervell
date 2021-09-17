import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Overlay from 'v2/components/UI/Overlay'

import { LinkViewMode, OnLinkViewModeChange } from 'v2/components/FullBlock'
import useSerializedMe from 'v2/hooks/useSerializedMe'

const BetaMessage = styled(Box).attrs({
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

const Option = styled.a`
  cursor: pointer;
  color: ${props => props.theme.colors.gray.regular} !important;
  &:before {
    content: '○ ';
  }

  ${props =>
    props.disabled &&
    `
    opacity: 50%;
  `}

  ${props =>
    props.selected &&
    `
    color: ${props.theme.colors.gray.semiBold} !important;

    &:before {
      content: '● ';
    }
  `}
`

interface FullBlockSwitchViewModeProps {
  linkViewMode: LinkViewMode
  onLinkViewModeChange: OnLinkViewModeChange
}

export const FullBlockSwitchViewMode: React.FC<FullBlockSwitchViewModeProps> = ({
  linkViewMode,
  onLinkViewModeChange,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const targetEl = useRef(null)
  const { is_premium } = useSerializedMe()

  const openReader = useCallback(() => {
    if (!is_premium) {
      setOpen(!open)
    } else {
      onLinkViewModeChange('reader')
    }
  }, [is_premium, setOpen, open, onLinkViewModeChange])

  return (
    <>
      <Option
        onClick={() => onLinkViewModeChange('screenshot')}
        selected={linkViewMode === 'screenshot'}
      >
        Preview
      </Option>
      <Option
        onClick={openReader}
        selected={linkViewMode === 'reader'}
        disabled={!is_premium}
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
              <strong>Reader mode (beta)</strong>
            </Text>
            <Text f={1} m={4}>
              Content from external websites is displayed in a stripped-down,
              reader-friendly format. Useful for articles, essays, interviews or
              any other long read formats. Still to come: full text search,
              website archives, and offline mode.
            </Text>
            <Text f={1} m={4}></Text>
            {!is_premium && (
              <Text f={1} m={4} color="state.premium">
                <strong>
                  <a href="/pricing">Upgrade to premium to get access</a>
                </strong>
              </Text>
            )}
          </BetaMessage>
        </Overlay>
      )}
    </>
  )
}
