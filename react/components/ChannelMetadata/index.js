import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

import Pocket from 'react/components/UI/Pocket';
import ChannelBreadcrumb from 'react/components/ChannelMetadata/components/ChannelBreadcrumb';
import ChannelMetadataCollaborators from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';
import ChannelMetadataConnections from 'react/components/ChannelMetadata/components/ChannelMetadataConnections';
import ChannelMetadataActions from 'react/components/ChannelMetadata/components/ChannelMetadataActions';
import { ChannelMetadataExpandableContext } from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

const Container = styled.div`
  position: relative;
  margin: 100px auto 0 auto;
`;

// TODO: Remove the negative margins once block grid is re-done.
const Pockets = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default class ChannelMetadata extends Component {
  static propTypes = {
    channel: propType(channelMetadataFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <Container>
        <ChannelBreadcrumb channel={channel} />

        <Actions>
          <ChannelMetadataActions channel={channel} />
        </Actions>

        <Pockets>
          <ChannelMetadataExpandableContext>
            <Pocket title="Info">
              <ChannelMetadataInfo channel={channel} />
            </Pocket>

            {(channel.can.manage_collaborators || channel.collaborators.length > 0) &&
              <Pocket title="Collaborators">
                <ChannelMetadataCollaborators channel={channel} />
              </Pocket>
            }

            <Pocket title="Connected to">
              <ChannelMetadataConnections channel={channel} />
            </Pocket>
          </ChannelMetadataExpandableContext>
        </Pockets>
      </Container>
    );
  }
}
