import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'

import LoadingIndicator from 'v2/components/UI/LoadingIndicator'

const hoverMixin = css`
  border: 1px solid ${props => props.theme.colors.gray.semiLight};
`

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.gray.hint};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  ${props => props.mode === Mode.HOVER && hoverMixin}
  &:hover {
    ${hoverMixin}
  }
`

interface Props {
  mode: Mode
}

export default class KonnectablePendingBlock extends PureComponent<Props> {
  static defaultProps = {
    mode: Mode.RESTING,
  }

  render() {
    const { mode } = this.props

    return (
      <Container mode={mode}>
        <LoadingIndicator />
      </Container>
    )
  }
}
