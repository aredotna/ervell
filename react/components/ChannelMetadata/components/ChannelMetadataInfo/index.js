import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Count from 'react/components/UI/Count';

import channelMetadataInfoFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/fragments/channelMetadataInfo';

const Buttons = styled.div`
  margin: 1em 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Button = styled.a`
  display: block;
`;

export default class ChannelMetadataInfo extends Component {
  static propTypes = {
    channel: propType(channelMetadataInfoFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <div>
        {channel.info &&
          <div dangerouslySetInnerHTML={{ __html: channel.info }} />
        }

        <Buttons>
          {channel.visibility !== 'private' &&
            <Button href={`${channel.href}/followers`}>
              <Count amount={channel.counts.followers} label="follower" />
            </Button>
          }

          <Button href="#TODO">
            Share
          </Button>
        </Buttons>
      </div>
    );
  }
}
