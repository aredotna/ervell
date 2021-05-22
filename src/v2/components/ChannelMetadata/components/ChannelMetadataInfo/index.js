import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Count from 'v2/components/UI/Count'
import ChannelShareButton from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton'
import { Expandable } from 'v2/components/UI/ExpandableSet'

import channelMetadataInfoFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo/fragments/channelMetadataInfo'

const Buttons = styled.div`
  margin: 0 0 1em;

  &:last-child {
    margin-bottom: 0;
  }

  a {
    display: block;
  }
`

const Section = styled.div`
  margin-bottom: 1em;
`

export default class ChannelMetadataInfo extends Component {
  static propTypes = {
    channel: propType(channelMetadataInfoFragment).isRequired,
  }

  render() {
    const { channel } = this.props

    return (
      <div>
        <Expandable>
          <Section dangerouslySetInnerHTML={{ __html: channel.info || '—' }} />
        </Expandable>

        {channel.owner.__typename === 'Group' && (
          <Section>
            Started by <Link to={channel.user.href}>{channel.user.name}</Link>
          </Section>
        )}

        <Buttons>
          {channel.visibility !== 'private' && channel.counts.followers > 0 && (
            <Link to={`${channel.href}/followers`} role="button" tabIndex={0}>
              <Count label="Follower" amount={channel.counts.followers} />
            </Link>
          )}

          {channel.can.share && <ChannelShareButton channel={channel} />}
        </Buttons>
      </div>
    )
  }
}
