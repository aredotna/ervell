import React from 'react'
import styled, { css } from 'styled-components'
import { scale } from 'proportional-scale'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'

import Box, { BoxProps } from 'v2/components/UI/Box'
import { KonnectableImg } from 'v2/components/Cell/components/Konnectable/components/KonnectableImg'

import constants from 'v2/styles/constants'

const hoverMixin = css`
  border: 1px solid ${props => props.theme.colors.gray.semiLight};
`

const Container = styled(Box)`
  height: 100%;
  width: 100%;

  ${props => props.mode === Mode.HOVER && hoverMixin}
  &:hover {
    ${hoverMixin}
  }
`

interface Props extends BoxProps {
  src: string
  srcs: string[]
  title?: string
  mode: Mode
  originalDimensions?: {
    width: number
    height: number
  }
}

export const KonnectableGeneric: React.FC<Props> = ({
  src,
  srcs,
  title = null,
  mode = Mode.RESTING,
  originalDimensions,
  ...rest
}) => {
  const { width: originalWidth, height: originalHeight } =
    originalDimensions || {}

  const { width, height } = scale({
    width: originalWidth,
    height: originalHeight,
    maxWidth: Math.min(originalWidth, parseInt(constants.blockWidth)),
    maxHeight: Math.min(originalHeight, parseInt(constants.blockWidth)),
  })

  return (
    <Container
      mode={mode}
      border="1px solid"
      borderColor="transparent"
      {...rest}
    >
      <KonnectableImg
        src={src}
        srcs={srcs}
        alt={title}
        width={width}
        height={height}
      />
    </Container>
  )
}

export default KonnectableGeneric
