import React from 'react'
import styled from 'styled-components'

import { LinksList } from 'v2/components/LinksList'
import { Expandable } from 'v2/components/UI/ExpandableSet'

import channelMetadataQuery from 'v2/components/ChannelMetadata/queries/channelMetadata'
import { ChannelMetadataConnections as Channel } from '__generated__/ChannelMetadataConnections'

import Connect from 'v2/components/Connect'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }

  &:first-child {
    margin-top: 0.66em;
  }
`

const ConnectionsList = styled(LinksList)`
  padding-right: 1em;
`

interface ChannelMetadataConnectionsProps {
  channel: Channel
}

export const ChannelMetadataConnections: React.FC<ChannelMetadataConnectionsProps> = ({
  channel,
}) => {
  const links = channel.connected_to_channels.map(c => ({
    href: c.href,
    state: getBreadcrumbPath(c),
    label: c.label,
  }))

  return (
    <div>
      {channel.connected_to_channels.length > 0 && (
        <Expandable>
          <ConnectionsList links={links} />
        </Expandable>
      )}

      {channel.can.connect && (
        <Actions>
          <Connect
            id={channel.id.toString()}
            type={BaseConnectableTypeEnum.CHANNEL}
            refetchQueries={[
              {
                query: channelMetadataQuery,
                variables: { id: channel.id },
              },
            ]}
          />
        </Actions>
      )}
    </div>
  )
}
