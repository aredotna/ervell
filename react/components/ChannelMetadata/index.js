import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import channelMetadataQuery from 'react/components/ChannelMetadata/queries/channelMetadata';

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

class ChannelMetadata extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { data: { channel } } = this.props;

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

export default graphql(channelMetadataQuery)(ChannelMetadata);
