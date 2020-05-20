import React, { useCallback } from 'react'
import styled from 'styled-components'

import { outlineBorder } from 'v2/styles/mixins'

import Box from 'v2/components/UI/Box'
import { DividerButton } from 'v2/components/UI/Buttons'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import { ConnectionSelection } from 'v2/components/ConnectionSelection'

import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

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
  background-color: ${props => props.theme.colors.background};

  &:after {
    margin: -1px;
    ${outlineBorder()}
  }
`

interface Props {
  id: number | string
  type: BaseConnectableTypeEnum
  onClose: (args?: any) => any
}

export const KonnectableOverlayConnect: React.FC<Props> = ({
  id,
  type,
  onClose,
}) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <Container onClick={stopPropagation}>
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

export default KonnectableOverlayConnect
