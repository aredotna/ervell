import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import LinksList from 'react/components/LinksList';
import ChannelMetadataExpandable from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

import channelMetadataConnectionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections';

import Connect from 'react/components/Connect';

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }
`;

export default class ChannelMetadataConnections extends Component {
  static propTypes = {
    channel: propType(channelMetadataConnectionsFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <div>
        {channel.connections.length > 0 &&
          <ChannelMetadataExpandable>
            <LinksList links={channel.connections} />
          </ChannelMetadataExpandable>
        }

        {channel.can.connect &&
          <Actions>
            <Connect id={channel.id} type="CHANNEL" />
          </Actions>
        }
      </div>
    );
  }
}
