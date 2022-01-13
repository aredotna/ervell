import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import Box, { BoxProps } from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import { ConnectionSelection } from 'v2/components/ConnectionSelection'

import { inputPadding } from 'v2/components/UI/Inputs'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import useLoginStatus from 'v2/hooks/useLoginStatus'

const Container = styled(Box)`
  position: relative;
  font-size: ${props => props.theme.fontSizesIndexed.xs};
`

const Fieldset = styled.div`
  position: relative;
`

const Close = styled.a.attrs({
  role: 'button',
})`
  position: absolute;
  top: 0;
  right: 100%;
  padding: ${inputPadding}; // TODO
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizesIndexed.xs};
  line-height: 1;
  border: 2px solid transparent;
  cursor: pointer;

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${props => props.theme.fontSizesIndexed.lg};
  }
`

// HACK: Inputs get rendered 2px taller than buttons
// given identical params. This allows us to match them up.
const ConnectPadding = styled.span`
  display: inline-block;
  padding: 1px 0;
`

interface ConnectProps {
  id: string | number
  type: BaseConnectableTypeEnum
  label?: string
  f?: number
  refetchQueries?: any
}

export const Connect: React.FC<ConnectProps & BoxProps> = ({
  id,
  type,
  f = 1,
  label = 'Connect &rarr;',
  refetchQueries = [],
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'active'>('resting')
  const { isLoggedIn } = useLoginStatus()

  const openConnect = useCallback(() => {
    if (!isLoggedIn) {
      window.location.href = `/sign_up?redirect-to=${window.location.pathname}`
      return null
    }

    setMode('active')
  }, [setMode])

  const handleClose = useCallback(() => {
    setMode('resting')
  }, [])

  return (
    <Container {...rest}>
      {mode === 'resting' && (
        <GenericButton onClick={openConnect} f={f}>
          <ConnectPadding>{label}</ConnectPadding>
        </GenericButton>
      )}

      {mode === 'active' && (
        <>
          <Fieldset>
            <Close onClick={handleClose}>
              &nbsp;
              <span>&times;</span>
            </Close>

            <ConnectionSelection
              id={id}
              type={type}
              refetchQueries={refetchQueries}
            />
          </Fieldset>
        </>
      )}
    </Container>
  )
}

export default Connect
