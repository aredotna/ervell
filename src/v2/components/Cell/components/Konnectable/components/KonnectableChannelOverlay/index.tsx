import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { KonnectableChannelOverlay as KonnectableChannelOverlayData } from '__generated__/KonnectableChannelOverlay'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import Box from 'v2/components/UI/Box'
import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'
import KonnectableOverlayConnect from 'v2/components/Cell/components/Konnectable/components/KonnectableOverlayConnect'
import KonnectableChannelPreview from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelPreview'

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
  isLoggedIn: boolean
  isPreviewable?: boolean
}

class KonnectableChannelOverlay extends PureComponent<Props> {
  static defaultProps = {
    isPreviewable: true,
  }

  state = {
    mode: Mode.RESTING,
  }

  openConnect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const { isLoggedIn, onOverlay } = this.props

    if (!isLoggedIn) {
      window.location.href = `/sign_up?redirect-to=${window.location.pathname}`
      return null
    }

    this.setState({ mode: Mode.OVERLAY })

    return onOverlay()
  }

  openPreview = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const { onOverlay } = this.props

    this.setState({ mode: Mode.PREVIEW })

    return onOverlay()
  }

  close = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    this.setState({ mode: Mode.RESTING })

    this.props.onClose()
  }

  render() {
    const { mode } = this.state
    const {
      channel: { id, visibility, counts },
      isPreviewable,
    } = this.props

    const allowPreview = isPreviewable && counts.contents > 0

    return (
      <Container mode={mode}>
        {mode === Mode.RESTING && (
          <>
            {allowPreview && (
              <DividerButton
                f={4}
                mr={2}
                color={`channel.${visibility}`}
                onClick={this.openPreview}
              >
                Preview
              </DividerButton>
            )}

            <DividerButton
              f={4}
              ml={allowPreview && 2}
              color={`channel.${visibility}`}
              onClick={this.openConnect}
            >
              Connect &rarr;
            </DividerButton>
          </>
        )}

        {mode === Mode.OVERLAY && (
          <KonnectableOverlayConnect
            id={id}
            type="CHANNEL"
            onClose={this.close}
          />
        )}

        {mode === Mode.PREVIEW && (
          <KonnectableChannelPreview
            id={id}
            color={`channel.${visibility}`}
            onClose={this.close}
          />
        )}
      </Container>
    )
  }
}

export default WithLoginStatus(KonnectableChannelOverlay)
