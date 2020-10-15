import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { KonnectableChannelOverlay as KonnectableChannelOverlayData } from '__generated__/KonnectableChannelOverlay'

import Box from 'v2/components/UI/Box'
import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'
import KonnectableOverlayConnect from 'v2/components/Cell/components/Konnectable/components/KonnectableOverlayConnect'
import KonnectableChannelPreview from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelPreview'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import useLoginStatus from 'v2/hooks/useLoginStatus'
import { useLocation } from 'react-router'

enum Mode {
  RESTING,
  OVERLAY,
  PREVIEW,
}

const CHANNEL_BORDER_OFFSET = '2px'

const Container = styled(Box).attrs({
  px: 5,
  pb: 0,
})`
  box-sizing: border-box;
  position: absolute;
  right: ${CHANNEL_BORDER_OFFSET};
  bottom: ${CHANNEL_BORDER_OFFSET};
  left: ${CHANNEL_BORDER_OFFSET};
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${props =>
    props.mode !== Mode.RESTING &&
    `
    top: ${CHANNEL_BORDER_OFFSET};
  `}
`

interface Props {
  channel: KonnectableChannelOverlayData
  onOverlay: () => any
  onClose: () => any
  isPreviewable?: boolean
}

export const KonnectableChannelOverlay: React.FC<Props> = ({
  channel,
  onOverlay,
  onClose,
  isPreviewable,
}) => {
  const [mode, setMode] = useState<Mode>(Mode.RESTING)
  const { isLoggedIn } = useLoginStatus()
  const location = useLocation()

  // We shouldn't show the connect button on the private share link page
  const showConnectButton = location.pathname.indexOf('/share/') === -1

  const { id, visibility, counts } = channel

  const allowPreview = isPreviewable && counts.contents > 0

  const openPreview = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      setMode(Mode.OVERLAY)

      return onOverlay()
    },
    [onOverlay]
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

  const close = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      setMode(Mode.RESTING)
      onClose()
    },
    [onClose]
  )

  return (
    <Container mode={mode}>
      {mode === Mode.RESTING && (
        <>
          {allowPreview && (
            <DividerButton
              f={4}
              mr={2}
              color={`channel.${visibility}`}
              onClick={openPreview}
            >
              Preview
            </DividerButton>
          )}

          {showConnectButton && (
            <DividerButton
              f={4}
              ml={allowPreview && 2}
              color={`channel.${visibility}`}
              onClick={openConnect}
            >
              Connect &rarr;
            </DividerButton>
          )}
        </>
      )}

      {mode === Mode.OVERLAY && (
        <KonnectableOverlayConnect
          id={id}
          type={BaseConnectableTypeEnum.CHANNEL}
          onClose={close}
        />
      )}

      {mode === Mode.PREVIEW && (
        <KonnectableChannelPreview
          id={id}
          color={`channel.${visibility}`}
          onClose={close}
        />
      )}
    </Container>
  )
}

export default KonnectableChannelOverlay
