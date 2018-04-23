import gql from 'graphql-tag';

import channelMetadataCollaboratorsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorsList';
import channelMetadataInfoFragment from 'react/components/ChannelMetadata/components/ChannelMetadataInfo/fragments/channelMetadataInfo';
import channelMetadataConnectionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections';
import channelMetadataActionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions';

export default gql`
  query ChannelMetadata($id: ID!) {
    channel(id: $id) {
      __typename
      id: slug
      title
      href
      visibility

      owner: user {
        __typename
        id
        name
        href
      }

      ...ChannelMetadataActions
      ...ChannelMetadataInfo
      ...CollaboratorsList
      ...ChannelMetadataConnections
    }
  }

  ${channelMetadataActionsFragment}
  ${channelMetadataInfoFragment}
  ${channelMetadataCollaboratorsFragment}
  ${channelMetadataConnectionsFragment}
`;
