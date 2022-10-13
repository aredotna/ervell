import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Overlay from 'v2/components/UI/Overlay'
import Icon from 'v2/components/UI/Icons'

import { useHover } from 'v2/hooks/useHover'

const LinkContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  pointer-events: all;
  max-width: fit-content;

  ${props =>
    props.isActive &&
    `
    svg path {
      fill: ${x => x.theme.colors.gray.block};
    }
  `}
`

const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Message = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'white',
  bg: 'state.premium',
  p: 4,
})`
  border-radius: ${props => props.theme.radii.regular};
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-width: 20em;
`

export const Copy = styled(Text).attrs({
  f: 1,
  m: 4,
  color: 'white',
  boldLinks: true,
})`
  ol li,
  ul li {
    margin-left: ${props => props.theme.space[3]};
  }
  ul,
  ol {
    margin-left: ${props => props.theme.space[3]};
    padding-left: ${props => props.theme.space[5]};
  }
  ol {
    list-style: decimal;
  }
`

export const Label = styled(Text).attrs({
  f: 1,
  ml: 2,
  fontWeight: 'bold',
})`
  margin-bottom: 1px;
`

interface Props {
  label?: string | React.ReactNode
  iconColor?: string
  iconHoverColor?: string
  labelColor?: string
  offsetY?: number
  offsetX?: number
  anchorX?: 'left' | 'right'
  anchorY?: 'top' | 'bottom'
  alignToX?: 'left' | 'right'
  alignToY?: 'top' | 'bottom'
}

export const QuestionMarkOverlay: React.FC<Props> = ({
  label = '',
  children,
  iconColor = 'gray.semiLight',
  iconHoverColor = 'gray.medium',
  labelColor = 'gray.semiLight',
  offsetY = 20,
  offsetX = 0,
  anchorX = 'left',
  anchorY = 'top',
  alignToX = 'right',
  alignToY = 'bottom',
}) => {
  const [hoverRef, isHovered] = useHover()
  const [isActive, setIsActive] = useState(false)
  const targetEl = useRef(null)

  const toggleFilterOpen = useCallback(() => {
    setIsActive(!isActive)
  }, [isActive, setIsActive])

  return (
    <>
      <LinkContainer
        ref={hoverRef}
        isActive={isHovered}
        onClick={toggleFilterOpen}
      >
        <IconContainer>
          {alignToX == 'left' && <span ref={targetEl} />}
          <Icon
            name="QuestionCircle"
            size="0.75rem"
            ml={3}
            color={isHovered || isActive ? iconHoverColor : iconColor}
          />

          {typeof label === 'string' ? (
            <Label color={labelColor}>{label}</Label>
          ) : (
            label
          )}
          {alignToX == 'right' && <span ref={targetEl} />}
        </IconContainer>
      </LinkContainer>

      {isActive && (
        <Overlay
          alignToY={alignToY}
          alignToX={alignToX}
          anchorY={anchorY}
          anchorX={anchorX}
          offsetY={offsetY}
          offsetX={offsetX}
          disableTarget
          targetEl={() => targetEl.current}
          onClose={toggleFilterOpen}
        >
          {children}
        </Overlay>
      )}
    </>
  )
}
