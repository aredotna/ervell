import React from 'react'

import Grid from 'v2/components/UI/Grid'
import Pocket from 'v2/components/UI/Pocket'
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import { ChannelBreadcrumb } from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb'
import ChannelMetadataCollaborators from 'v2/components/ChannelMetadata/components/ChannelMetadataCollaborators'
import ChannelMetadataInfo from 'v2/components/ChannelMetadata/components/ChannelMetadataInfo'
import { ChannelMetadataConnections } from 'v2/components/ChannelMetadata/components/ChannelMetadataConnections'
import ChannelMetadataActions from 'v2/components/ChannelMetadata/components/ChannelMetadataActions'
import { ExpandableContext } from 'v2/components/UI/ExpandableSet'
import { ChannelMetadata as Channel } from '__generated__/ChannelMetadata'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { ChannelMetadataView } from './components/ChannelMetadataView'

interface ChannelMetadataProps {
  channel: Channel
  view?: 'grid' | 'table'
}

export const ChannelMetadata: React.FC<ChannelMetadataProps> = ({
  channel,
  view,
  ...rest
}) => {
  const me = useSerializedMe()

  console.log({ view })

  return (
    <HeaderMetadataContainer
      breadcrumb={<ChannelBreadcrumb channel={channel} />}
      actions={<ChannelMetadataActions channel={channel} />}
      {...rest}
    >
      <ExpandableContext>
        <Grid gutterSpacing={2} variableHeight>
          <Pocket title="Info">
            <ChannelMetadataInfo channel={channel} />
          </Pocket>

          {(channel.can.manage_collaborators ||
            channel.collaborators.length > 0) && (
            <Pocket title="Collaborators">
              <ChannelMetadataCollaborators channel={channel} />
            </Pocket>
          )}

          {(channel.can.connect ||
            channel.connected_to_channels.length > 0) && (
            <Pocket title="This channel appears in">
              <ChannelMetadataConnections channel={channel} />
            </Pocket>
          )}

          {me.is_supporter && (
            <Pocket title="View">
              <ChannelMetadataView channel={channel} view={view} />
            </Pocket>
          )}
        </Grid>
      </ExpandableContext>
    </HeaderMetadataContainer>
  )
}

export default ChannelMetadata
