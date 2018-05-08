import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

import ChannelBreadcrumb from 'react/components/ChannelMetadata/components/ChannelBreadcrumb';
import ChannelMetadataPocket from 'react/components/ChannelMetadata/components/ChannelMetadataPocket';
import ChannelMetadataCollaborators from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';
import ChannelMetadataConnections from 'react/components/ChannelMetadata/components/ChannelMetadataConnections';
import ChannelMetadataActions from 'react/components/ChannelMetadata/components/ChannelMetadataActions';
import { ChannelMetadataExpandableContext } from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

const Container = styled.div`
  position: relative;
  margin: 100px auto 0 auto;
`;

const Pockets = styled.div`
  display: flex;
  flex-wrap: wrap;
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
            <ChannelMetadataPocket title="Info">
              <ChannelMetadataInfo channel={channel} />
            </ChannelMetadataPocket>

            {(channel.can.manage_collaborators || channel.collaborators.length > 0) &&
              <ChannelMetadataPocket title="Collaborators">
                <ChannelMetadataCollaborators channel={channel} />
              </ChannelMetadataPocket>
            }

            <ChannelMetadataPocket title="Connected to">
              <ChannelMetadataConnections channel={channel} />
            </ChannelMetadataPocket>
          </ChannelMetadataExpandableContext>
        </Pockets>
      </Container>
    );
  }
}
