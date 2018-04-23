import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import channelMetadataQuery from 'react/components/ChannelMetadata/queries/channelMetadata';

import ColoredChannelLink from 'react/components/UI/ColoredChannelLink';
import BreadcrumbPath from 'react/components/BreadcrumbPath';
import ChannelMetadataPocket from 'react/components/ChannelMetadata/components/ChannelMetadataPocket';
import ChannelMetadataCollaborators from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';
import ChannelMetadataConnections from 'react/components/ChannelMetadata/components/ChannelMetadataConnections';
import ChannelMetadataActions from 'react/components/ChannelMetadata/components/ChannelMetadataActions';

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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { id, data: { channel } } = this.props;

    return (
      <Container>
        <BreadcrumbPath>
          <BreadcrumbPath.Crumb>
            <a href={channel.owner.href}>
              {channel.owner.name}
            </a>
          </BreadcrumbPath.Crumb>

          <BreadcrumbPath.Crumb>
            <ColoredChannelLink
              title={channel.title}
              href={channel.href}
              visibility={channel.visibility}
            >
              {channel.title}
            </ColoredChannelLink>
          </BreadcrumbPath.Crumb>
        </BreadcrumbPath>

        <Actions>
          <ChannelMetadataActions channel={channel} />
        </Actions>

        <Pockets>
          <ChannelMetadataPocket title="Info">
            <ChannelMetadataInfo channel={channel} />
          </ChannelMetadataPocket>

          {channel.can.manage_collaborators &&
            <ChannelMetadataPocket title="Collaborators">
              <ChannelMetadataCollaborators channel={channel} channel_id={id} />
            </ChannelMetadataPocket>
          }

          <ChannelMetadataPocket title="Connected to">
            <ChannelMetadataConnections channel={channel} />
          </ChannelMetadataPocket>
        </Pockets>
      </Container>
    );
  }
}

export default graphql(channelMetadataQuery)(ChannelMetadata);
