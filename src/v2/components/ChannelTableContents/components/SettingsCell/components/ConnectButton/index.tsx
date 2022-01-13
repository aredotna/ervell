import React, { useCallback, useRef, useState } from 'react'

import { BoxProps } from 'v2/components/UI/Box'
import { ConnectionSelection } from 'v2/components/ConnectionSelection'
import Overlay from 'v2/components/UI/Overlay'
import BorderedBox from 'v2/components/UI/BorderedBox'

import useLoginStatus from 'v2/hooks/useLoginStatus'

import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import { Button } from '../..'
interface ConnectProps {
  id: string | number
  type: BaseConnectableTypeEnum
  refetchQueries?: any
}

export const ConnectButton: React.FC<ConnectProps & BoxProps> = ({
  id,
  type,
  refetchQueries = [],
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'active'>('resting')
  const targetEl = useRef(null)
  const { isLoggedIn } = useLoginStatus()

  const openConnect = useCallback(
    (e: React.MouseEvent) => {
      if (!isLoggedIn) {
        window.location.href = `/sign_up?redirect-to=${window.location.pathname}`
        return null
      }

      e.preventDefault()
      e.stopPropagation()

      setMode('active')
    },
    [setMode]
  )

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setMode('resting')
  }, [])

  return (
    <>
      <Button
        ref={targetEl}
        onClick={{ active: handleClose, resting: openConnect }[mode]}
        {...rest}
      >
        {mode == 'active' ? <span>&times;</span> : <span>&rarr;</span>}
      </Button>

      {mode === 'active' && (
        <>
          <Overlay
            onClose={handleClose}
            targetEl={() => targetEl.current}
            alignToY="bottom"
            alignToX="right"
            anchorY="top"
            anchorX="right"
            offsetY={5}
            offsetX={0}
            disableTarget
          >
            <BorderedBox p={4} width="300px">
              <ConnectionSelection
                id={id}
                type={type}
                refetchQueries={refetchQueries}
              />
            </BorderedBox>
          </Overlay>
        </>
      )}
    </>
  )
}

export default ConnectButton
