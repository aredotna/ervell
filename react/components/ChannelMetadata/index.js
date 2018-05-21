import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import styles from 'react/styles';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

import Grid from 'react/components/UI/Grid';
import Pocket from 'react/components/UI/Pocket';
import ChannelBreadcrumb from 'react/components/ChannelMetadata/components/ChannelBreadcrumb';
import ChannelMetadataCollaborators from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';
import ChannelMetadataConnections from 'react/components/ChannelMetadata/components/ChannelMetadataConnections';
import ChannelMetadataActions from 'react/components/ChannelMetadata/components/ChannelMetadataActions';
import { ChannelMetadataExpandableContext } from 'react/components/ChannelMetadata/components/ChannelMetadataExpandable';

const Container = styled.div`
  position: relative;
  margin: ${styles.Constants.containerOffset} auto 0 auto;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  ${styles.Constants.media.mobile`
    position: static;
    width: 100%;
    margin-bottom: 2em;
    margin-right: ${styles.Constants.blockGutter}; // TODO: Remove
    margin-left: ${styles.Constants.blockGutter}; // TODO: Remove
  `}
  }
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

        <ChannelMetadataExpandableContext>
          <Grid variableHeight>
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
          </Grid>
        </ChannelMetadataExpandableContext>
      </Container>
    );
  }
}
