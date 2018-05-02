import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import LinksList from 'react/components/LinksList';
import ChannelMetadataExpandable from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

import channelMetadataConnectionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections';

import LegacyConnect from 'react/components/LegacyConnect';

import gql from 'graphql-tag';
import { initApolloClient } from 'react/apollo';

const client = initApolloClient();

const QUERY = id => gql`
  {
    channel(id: ${id}) {
      ...ChannelMetadataConnections
    }
  }
  ${channelMetadataConnectionsFragment}
`;

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }
`;

export default class ChannelMetadataConnections extends Component {
  static propTypes = {
    channel: propType(channelMetadataConnectionsFragment).isRequired,
  }

  onConnection = () =>
    client.query({ query: QUERY(this.props.channel.id) });

  render() {
    const { channel } = this.props;

    return (
      <div>
        {channel.connections.length > 0 &&
          <ChannelMetadataExpandable>
            <LinksList links={channel.connections} />
          </ChannelMetadataExpandable>
        }

        <Actions>
          <LegacyConnect
            connectable_id={channel._id}
            connectable_type="Channel"
            onConnectionAdded={this.onConnection}
            onConnectionRemoved={this.onConnection}
          />
        </Actions>
      </div>
    );
  }
}
