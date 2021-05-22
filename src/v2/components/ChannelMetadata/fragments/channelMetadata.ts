import { gql } from '@apollo/client'

import channelMetadataCollaboratorsFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators/fragments/collaboratorsList'
import channelMetadataInfoFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo/fragments/channelMetadataInfo'
import channelMetadataConnectionsFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections'
import channelMetadataActionsFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions'
import channelShareButtonFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo/components/ChannelShareButton/fragments/channelShareButton'
import channelBreadcrumbFragment from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb'

export default gql`
  fragment ChannelMetadata on Channel {
    ...ChannelBreadcrumb
    ...ChannelMetadataActions
    ...ChannelMetadataInfo
    ...CollaboratorsList
    ...ChannelMetadataConnections
    ...ChannelShareButton
  }

  ${channelBreadcrumbFragment}
  ${channelMetadataActionsFragment}
  ${channelMetadataInfoFragment}
  ${channelMetadataCollaboratorsFragment}
  ${channelMetadataConnectionsFragment}
  ${channelShareButtonFragment}
`
