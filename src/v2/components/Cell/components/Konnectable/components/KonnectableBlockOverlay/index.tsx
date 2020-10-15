import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router'

import { KonnectableBlockOverlay as KonnectableBlockOverlayData } from '__generated__/KonnectableBlockOverlay'

import { FilledButton } from 'v2/components/UI/Buttons'
import KonnectableOverlayConnect from 'v2/components/Cell/components/Konnectable/components/KonnectableOverlayConnect'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import useLoginStatus from 'v2/hooks/useLoginStatus'

enum Mode {
  RESTING,
  OVERLAY,
  HOVER,
}

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const OverlayButton = styled(FilledButton).attrs({
  f: 4,
  px: 0,
  py: 6,
})`
  display: flex;
  flex: 0.46;
  justify-content: center;
`

interface Props {
  konnectable: KonnectableBlockOverlayData
  onOverlay: () => any
  onClose: () => any
}

export const KonnectableBlockOverlay: React.FC<Props> = ({
  konnectable,
  onOverlay,
  onClose,
}) => {
  const [mode, setMode] = useState<Mode>(Mode.RESTING)
  const { isLoggedIn } = useLoginStatus()
  const location = useLocation()

  const { id, source, __typename } = konnectable
  const sourceUrl = source && __typename !== 'Image' && source.url

  // We shouldn't show the connect button on the private share link page
  const showConnectButton = location.pathname.startsWith('/index/')

  const handleClickSource = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const {
        source: { url: href },
      } = konnectable

      const newTab = window.open(href, '_blank')
      newTab.focus()

      // Prevent new window from gaining access to this window
      newTab.opener = null
    },
    [konnectable]
  )

  const openConnect = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (!isLoggedIn) {
        window.location.href = `/sign_up?redirect-to=${window.location.pathname}`
        return null
      }

      setMode(Mode.OVERLAY)

      return onOverlay()
    },
    [isLoggedIn, onOverlay]
  )

  const closeConnect = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      setMode(Mode.RESTING)
      onClose()
    },
    [onClose]
  )

  return (
    <Container>
      {mode === Mode.RESTING && sourceUrl && (
        <OverlayButton ml={4} mr={2} onClick={handleClickSource}>
          Source
        </OverlayButton>
      )}

      {mode === Mode.RESTING && showConnectButton && (
        <OverlayButton
          ml={sourceUrl && 2}
          mr={sourceUrl && 4}
          onClick={openConnect}
        >
          Connect &rarr;
        </OverlayButton>
      )}

      {mode === Mode.OVERLAY && (
        <KonnectableOverlayConnect
          id={id}
          type={BaseConnectableTypeEnum.BLOCK}
          onClose={closeConnect}
        />
      )}
    </Container>
  )
}

export default KonnectableBlockOverlay
