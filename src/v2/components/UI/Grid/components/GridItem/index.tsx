import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import constants from 'v2/styles/constants'

import { multiply } from 'v2/styles/functions'

import Box, { BoxProps } from 'v2/components/UI/Box'

const SIZE = constants.blockWidth
const GUTTER = constants.blockGutter

export const gutterMargins = css`
  ${props => `
    margin: 0 ${GUTTER} ${multiply(GUTTER, props.gutterSpacing)} ${GUTTER};
  `}
`

const Container = styled(Box)`
  position: relative;
  ${gutterMargins}
`

interface Props extends BoxProps {
  children: ReactNode
  gutterSpacing?: number
  variableHeight?: boolean
  width?: string
  height?: string
  onDrag?: (e: React.DragEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const GridItem: React.FC<Props> = ({
  children,
  gutterSpacing = 4,
  width = SIZE,
  height = SIZE,
  variableHeight = true,
  onDrag = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  ...rest
}) => (
  <Container
    gutterSpacing={gutterSpacing}
    onDrag={onDrag}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    width={width}
    height={!variableHeight ? height : undefined}
    {...rest}
  >
    {children}
  </Container>
)

export default GridItem
