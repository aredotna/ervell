import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Count from 'react/components/UI/Count';
import Link from 'react/components/UI/LinkUnlessCurrent';
import ChannelShareButton from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton';
import { Expandable } from 'react/components/UI/ExpandableSet';

import channelMetadataInfoFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/fragments/channelMetadataInfo';

const Buttons = styled.div`
  margin: 1em 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  a {
    display: block;
  }
`;

const OwnerLink = styled.div`
  margin: 1em 0;
`;

export default class ChannelMetadataInfo extends Component {
  static propTypes = {
    channel: propType(channelMetadataInfoFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <div>
        <Expandable>
          <div dangerouslySetInnerHTML={{ __html: channel.info || '—' }} />
        </Expandable>

        {channel.owner.__typename === 'Group' &&
          <OwnerLink>
            Started by <Link href={channel.user.href}>{channel.user.name}</Link>
          </OwnerLink>
        }

        <Buttons>
          {channel.visibility !== 'private' && channel.counts.followers > 0 &&
            <a href={`${channel.href}/followers`} role="button" tabIndex={0}>
              <Count label="Follower" amount={channel.counts.followers} />
            </a>
          }

          <ChannelShareButton channel={channel} />
        </Buttons>
      </div>
    );
  }
}
