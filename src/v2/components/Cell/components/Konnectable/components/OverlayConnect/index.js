import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { outlineBorder } from 'v2/styles/mixins'

import Box from 'v2/components/UI/Box'
import { DividerButton } from 'v2/components/UI/Buttons'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import ConnectionSelection from 'v2/components/ConnectionSelection'

const Container = styled(Box).attrs({
  pt: 4,
  px: 4,
  pb: 0,
  border: '1px solid',
  borderColor: 'gray.regular',
})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;

  &:after {
    margin: -1px;
    ${outlineBorder()}
  }
`

export default class OverlayConnect extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
    onClose: PropTypes.func.isRequired,
  }

  stopPropagation = e => e.stopPropagation()

  render() {
    const { id, type, onClose } = this.props

    return (
      <Container onClick={this.stopPropagation}>
        <Box flex="1">
          <ErrorBoundary isReloadable={false}>
            <ConnectionSelection id={id} type={type} isOutlined={false} />
          </ErrorBoundary>
        </Box>

        <DividerButton f={4} mb="-1px" onClick={onClose}>
          Close
        </DividerButton>
      </Container>
    )
  }
}
