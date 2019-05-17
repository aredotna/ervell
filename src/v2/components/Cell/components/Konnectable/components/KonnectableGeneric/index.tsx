import React from 'react'
import styled, { css } from 'styled-components'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'

import Box, { BoxProps } from 'v2/components/UI/Box'
import { KonnectableImg } from 'v2/components/Cell/components/Konnectable/components/KonnectableImg'

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
  title?: string
  mode?: Mode
}

export const KonnectableGeneric: React.FC<Props> = ({
  src,
  title = null,
  mode = Mode.RESTING,
  ...rest
}) => (
  <Container mode={mode} border="1px solid" borderColor="transparent" {...rest}>
    <KonnectableImg src={src} alt={title} />
  </Container>
)

export default KonnectableGeneric
