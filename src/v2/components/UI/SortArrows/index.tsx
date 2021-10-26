import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import { themeGet } from 'styled-system'

import ArrowPath from './arrowPath.js'

const IconContainer = styled(Box)`
  display: inline-block;
  position: relative;
  width: 9px;
  height: 9px;
  vertical-align: bottom;
  cursor: pointer;
  padding: 2px 0;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => themeGet(`colors.gray.light`, 'inherit')({ theme })};
  }

  &:hover > svg {
    fill: ${({ theme }) =>
      themeGet(`colors.gray.medium`, 'inherit')({ theme })};
  }
`

const StyledArrow = styled(ArrowPath)`
  ${({ selected }) => {
    if (selected) {
      return `
        fill: #000 !important;
      `
    }
  }}
`

const UpArrow = styled(StyledArrow)`
  transform-origin: center;
  transform: rotate(180deg) translateX(1px);
`

const DownArrow = styled(StyledArrow)``

interface SortArrowsProps {
  state?: 'up' | 'down' | 'off'
  onUp?: () => void
  onDown?: () => void
}

const SortArrows: React.FC<SortArrowsProps> = ({
  state = 'downs',
  onDown,
  onUp,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <IconContainer onClick={onUp}>
        <UpArrow selected={state === 'up'} />
      </IconContainer>
      <IconContainer onClick={onDown}>
        <DownArrow selected={state === 'down'} />
      </IconContainer>
    </Box>
  )
}

export default SortArrows
