import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { KonnectableBlockOverlay as KonnectableBlockOverlayData } from '__generated__/KonnectableBlockOverlay'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import { FilledButton } from 'v2/components/UI/Buttons'
import KonnectableOverlayConnect from 'v2/components/Cell/components/Konnectable/components/KonnectableOverlayConnect'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

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
  isLoggedIn: boolean
}

class KonnectableBlockOverlay extends PureComponent<Props> {
  state = {
    mode: Mode.RESTING,
  }

  openSource = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const {
      konnectable: {
        source: { url: href },
      },
    } = this.props

    const newTab = window.open(href, '_blank')
    newTab.focus()

    // Prevent new window from gaining access to this window
    newTab.opener = null
  }

  openConnect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const { isLoggedIn, onOverlay } = this.props

    if (!isLoggedIn) {
      window.location.href = `/sign_up?redirect-to=${window.location.pathname}`
      return null
    }

    this.setState({ mode: Mode.OVERLAY })

    return onOverlay()
  }

  closeConnect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    this.setState({ mode: Mode.RESTING })
    this.props.onClose()
  }

  render() {
    const { mode } = this.state
    const {
      konnectable: { id, source, __typename },
    } = this.props

    const sourceUrl = source && __typename !== 'Image' && source.url

    return (
      <Container>
        {mode === Mode.RESTING && sourceUrl && (
          <OverlayButton ml={4} mr={2} onClick={this.openSource}>
            Source
          </OverlayButton>
        )}

        {mode === Mode.RESTING && (
          <OverlayButton
            ml={sourceUrl && 2}
            mr={sourceUrl && 4}
            onClick={this.openConnect}
          >
            Connect &rarr;
          </OverlayButton>
        )}

        {mode === Mode.OVERLAY && (
          <KonnectableOverlayConnect
            id={id}
            type={BaseConnectableTypeEnum.BLOCK}
            onClose={this.closeConnect}
          />
        )}
      </Container>
    )
  }
}

export default WithLoginStatus(KonnectableBlockOverlay)
