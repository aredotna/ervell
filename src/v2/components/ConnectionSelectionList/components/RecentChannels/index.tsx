import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'

import recentChannelsQuery from 'v2/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels'

import {
  RecentChannelsQuery,
  RecentChannelsQueryVariables,
} from '__generated__/RecentChannelsQuery'
import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

interface RecentChannelsContainerProps {
  isOutlined: boolean
  cursor: number
  onConnectionSelection?: (isSelected: boolean, channel: Channel) => void
}

export const RecentChannelsContainer: React.FC<RecentChannelsContainerProps> = ({
  isOutlined,
  cursor,
  onConnectionSelection,
  ...rest
}) => {
  const { data, loading, error } = useQuery<
    RecentChannelsQuery,
    RecentChannelsQueryVariables
  >(recentChannelsQuery)

  if (error) {
    return <Indicator label="Error" {...rest} />
  }

  if (loading) {
    return <Indicator label="Loading..." {...rest} />
  }

  return (
    <>
      <ChannelsList
        channels={data.me}
        onConnectionSelection={onConnectionSelection}
      />
    </>
  )
}
