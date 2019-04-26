import React, { PureComponent } from 'react'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import channelOverlayFragment from 'v2/components/Cell/components/Konnectable/components/ChannelOverlay/fragments/channelOverlay'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import Box from 'v2/components/UI/Box'
import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'
import OverlayConnect from 'v2/components/Cell/components/Konnectable/components/OverlayConnect'
import ChannelPreview from 'v2/components/Cell/components/Konnectable/components/ChannelPreview'

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
    props.mode !== 'resting' &&
    `
    top: ${CHANNEL_BORDER_OFFSET};
  `}
`

class ChannelOverlay extends PureComponent {
  static propTypes = {
    channel: propType(channelOverlayFragment).isRequired,
    onOverlay: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isPreviewable: PropTypes.bool,
  }

  static defaultProps = {
    isPreviewable: true,
  }

  state = {
    mode: 'resting',
  }

  openConnect = e => {
    e.preventDefault()

    const { isLoggedIn, onOverlay } = this.props

    if (!isLoggedIn) {
      window.location = `/sign_up?redirect-to=${window.location.pathname}`
      return null
    }

    this.setState({ mode: 'overlay' })
    return onOverlay()
  }

  openPreview = e => {
    e.preventDefault()

    const { onOverlay } = this.props
    this.setState({ mode: 'preview' })
    return onOverlay()
  }

  close = e => {
    e.preventDefault()

    this.setState({ mode: 'resting' })
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
        {mode === 'resting' && (
          <React.Fragment>
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
          </React.Fragment>
        )}

        {mode === 'overlay' && (
          <OverlayConnect id={id} type="CHANNEL" onClose={this.close} />
        )}

        {mode === 'preview' && (
          <ChannelPreview
            id={id}
            color={`channel.${visibility}`}
            onClose={this.close}
          />
        )}
      </Container>
    )
  }
}

export default WithLoginStatus(ChannelOverlay)
