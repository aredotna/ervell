import gql from 'graphql-tag';

import channelMetadataCollaboratorsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorsList';
import channelMetadataInfoFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/fragments/channelMetadataInfo';
import channelMetadataConnectionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections';
import channelMetadataActionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions';
import channelShareButtonFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/fragments/channelShareButton';
import channelBreadcrumbFragment from 'react/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb';

export default gql`
  query ChannelMetadata($id: ID!) {
    channel(id: $id) {
      ...ChannelBreadcrumb
      ...ChannelMetadataActions
      ...ChannelMetadataInfo
      ...CollaboratorsList
      ...ChannelMetadataConnections
      ...ChannelShareButton
    }
  }

  ${channelBreadcrumbFragment}
  ${channelMetadataActionsFragment}
  ${channelMetadataInfoFragment}
  ${channelMetadataCollaboratorsFragment}
  ${channelMetadataConnectionsFragment}
  ${channelShareButtonFragment}
`;
