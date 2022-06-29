import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Overlay from 'v2/components/UI/Overlay'
import Icon from 'v2/components/UI/Icons'

import { LinkViewMode, OnLinkViewModeChange } from 'v2/components/FullBlock'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { useHover } from 'v2/hooks/useHover'

const LinkContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${props =>
    props.isActive &&
    `
    svg path {
      fill: ${x => x.theme.colors.gray.block} !important;
    }
  `}
`

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

const OptionOuter = styled(Box).attrs({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})``

const Option = styled.a`
  cursor: pointer;
  color: ${props => props.theme.colors.gray.regular} !important;
  display: flex !important;
  flex-direction: row;

  &:hover {
    color: ${props => props.theme.colors.gray.semiBold} !important;
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
  `}
`

const Circle = styled(Icon).attrs({
  size: '0.7em',
  mr: 4,
  color: 'gray.medium',
  mb: '0.117em',
})``

interface FullBlockSwitchViewModeProps {
  linkViewMode: LinkViewMode
  onLinkViewModeChange: OnLinkViewModeChange
}

export const FullBlockSwitchViewMode: React.FC<FullBlockSwitchViewModeProps> = ({
  linkViewMode,
  onLinkViewModeChange,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const { is_premium } = useSerializedMe()
  const navigate = useNavigate()

  const openReader = useCallback(() => {
    if (!is_premium) {
      navigate('/pricing')
    } else {
      onLinkViewModeChange('reader')
    }
  }, [is_premium, setOpen, open, onLinkViewModeChange])

  return (
    <>
      <OptionOuter>
        <Circle
          name={
            linkViewMode === 'screenshot' ? 'CircleFilled' : 'CircleOutline'
          }
          color="gray.regular"
        />
        <Option
          onClick={() => onLinkViewModeChange('screenshot')}
          selected={linkViewMode === 'screenshot'}
        >
          Preview
        </Option>
      </OptionOuter>
      <OptionOuter>
        <Circle
          name={linkViewMode === 'reader' ? 'CircleFilled' : 'CircleOutline'}
          color="gray.regular"
        />
        <Option
          onClick={openReader}
          selected={linkViewMode === 'reader'}
          disabled={!is_premium}
        >
          Full text
        </Option>
        <QuestionMarkOverlay />
      </OptionOuter>
    </>
  )
}

export const QuestionMarkOverlay: React.FC = () => {
  const [hoverRef, isHovered] = useHover()
  const targetEl = useRef(null)

  return (
    <>
      <LinkContainer ref={hoverRef} isActive={isHovered}>
        <Icon
          name="QuestionCircle"
          size="0.75rem"
          ml={3}
          color={isHovered ? 'gray.medium' : 'gray.semiLight'}
        />
        <span ref={targetEl} />
      </LinkContainer>

      {isHovered && (
        <Overlay
          alignToY="bottom"
          alignToX="right"
          anchorY="top"
          anchorX="left"
          offsetY={5}
          offsetX={0}
          disableTarget
          targetEl={() => targetEl.current}
        >
          <BetaMessage>
            <Text f={1} m={4}>
              <strong>Reader mode</strong>
            </Text>
            <Text f={1} m={4}>
              Content from external websites is displayed in a stripped-down,
              reader-friendly format. Useful for articles, essays, interviews or
              any other long read formats. Still to come: full text search,
              website archives, and offline mode.
            </Text>
          </BetaMessage>
        </Overlay>
      )}
    </>
  )
}
