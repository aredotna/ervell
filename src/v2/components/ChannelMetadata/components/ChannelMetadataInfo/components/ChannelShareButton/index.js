import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'
import { isNull } from 'underscore'
import { graphql } from '@apollo/client/react/hoc'

import { Input } from 'v2/components/UI/Inputs'
import CopyToClipboard from 'v2/components/UI/CopyToClipboard'

import shareChannelMutation from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/mutations/shareChannel'
import channelShareButtonFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/fragments/channelShareButton'

const Container = styled.div`
  ${x =>
    x.mode === 'active' &&
    `
    margin: 1em 0;

    &:last-child {
      margin-bottom: 0;
    }
  `}
`

const Actions = styled.div`
  margin: 1em 0;
`

const Button = styled.a.attrs({
  role: 'button',
  tabIndex: 0,
})`
  display: block;
  cursor: pointer;
`

class ChannelShareButton extends Component {
  static propTypes = {
    channel: propType(channelShareButtonFragment).isRequired,
    shareChannel: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const {
      channel: {
        visibility,
        share: { url },
      },
    } = props

    const isAlreadyGenerated = visibility === 'private' && !!url

    this.state = {
      mode: isAlreadyGenerated ? 'active' : 'resting',
      remote: 'resting',
    }
  }

  disableShareLink = async () => {
    const { channel, shareChannel } = this.props

    this.setState({ remote: 'disabling' })

    await shareChannel({
      variables: { id: channel.id, enable: false },
    })

    this.setState({ mode: 'resting', remote: 'resting' })
  }

  displayShareOptions = async () => {
    const { channel, shareChannel } = this.props

    if (isNull(channel.share.url)) {
      this.setState({ remote: 'generating' })

      try {
        await shareChannel({
          variables: { id: channel.id, enable: true },
        })
      } catch (err) {
        this.setState({ mode: 'resting', remote: 'error' })
        return
      }
    }

    this.setState({ mode: 'active', remote: 'resting' })
  }

  render() {
    const { mode, remote } = this.state
    const { channel } = this.props

    const restingLabel =
      channel.visibility === 'private' ? 'Generate shareable link' : 'Share'

    return (
      <Container mode={mode}>
        {mode !== 'active' && (
          <Button onClick={this.displayShareOptions}>
            {
              {
                resting: restingLabel,
                generating: 'Generating...',
                error: 'An error has occurred. Try again.',
              }[remote]
            }
          </Button>
        )}

        {mode === 'active' && channel.share.url && (
          <div>
            <Input f={1} value={channel.share.url} readOnly />

            <Actions>
              <CopyToClipboard
                f={1}
                label="Copy link"
                value={channel.share.url}
              />

              {channel.visibility === 'private' && (
                <Button onClick={this.disableShareLink}>
                  {
                    {
                      resting: 'Disable share link',
                      disabling: 'Disabling...',
                    }[remote]
                  }
                </Button>
              )}

              {channel.share.twitter_url && (
                <Button href={channel.share.twitter_url} target="_blank">
                  Twitter
                </Button>
              )}

              {channel.share.facebook_url && (
                <Button href={channel.share.facebook_url} target="_blank">
                  Facebook
                </Button>
              )}
            </Actions>
          </div>
        )}
      </Container>
    )
  }
}

export default graphql(shareChannelMutation, {
  name: 'shareChannel',
})(ChannelShareButton)
