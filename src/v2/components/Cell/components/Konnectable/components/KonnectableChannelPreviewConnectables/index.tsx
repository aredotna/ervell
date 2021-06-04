import React, { PureComponent } from 'react'
import styled from 'styled-components'

import preloadImages from 'v2/util/preloadImages'

import { KonnectableChannelPreview_channel_preview_connectables } from '__generated__/KonnectableChannelPreview'

import Box from 'v2/components/UI/Box'
import { KonnectableSimpleDisplay } from 'v2/components/Cell/components/Konnectable/components/KonnectableSimpleDisplay'

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  width: ${props => props.theme.constantValues.blockPreviewWidth};
  height: ${props => props.theme.constantValues.blockPreviewWidth};

  &:hover {
    opacity: 0.1;
  }
`

enum Mode {
  LOADING,
  READY,
}

interface Props {
  connectables: KonnectableChannelPreview_channel_preview_connectables[]
  LoadingIndicator: React.ComponentType
  speed?: number
}

interface State {
  mode: Mode
  cursor: number
}

export default class ChannelPreviewConnectables extends PureComponent<
  Props,
  State
> {
  static defaultProps = {
    speed: 500,
  }

  state: Readonly<State> = {
    mode: Mode.LOADING,
    cursor: 0,
  }

  interval: NodeJS.Timer

  componentDidMount() {
    const { connectables } = this.props

    const imageUrls = connectables
      .map(
        c =>
          c.__typename !== 'PendingBlock' &&
          c.__typename !== 'Channel' &&
          c.__typename !== 'Text' &&
          c.preview_image_url
      )
      .filter(Boolean)

    preloadImages(imageUrls)
      .then(() => this.setState({ mode: Mode.READY }, () => this.play()))
      .catch(() => this.setState({ mode: Mode.READY }, () => this.play()))
  }

  componentWillUnmount() {
    this.stop()
  }

  play() {
    const { speed } = this.props

    this.interval = setInterval(() => {
      this.setState(prevState => ({ cursor: prevState.cursor + 1 }))
    }, speed)
  }

  stop() {
    clearInterval(this.interval)
  }

  render() {
    const { cursor, mode } = this.state
    const { connectables, LoadingIndicator, ...rest } = this.props

    const connectable = connectables[cursor % connectables.length]

    if (mode === Mode.LOADING) {
      return <LoadingIndicator />
    }

    return (
      <Container {...rest}>
        <KonnectableSimpleDisplay connectable={connectable} />
      </Container>
    )
  }
}
