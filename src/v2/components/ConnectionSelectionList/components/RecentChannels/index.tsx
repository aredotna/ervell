import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'

import recentChannelsQuery from 'v2/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels'

import { onConnectionSelectionType } from 'v2/components/ConnectionSelectionList'
import { RecentChannelsQuery } from '__generated__/RecentChannelsQuery'
import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

interface RecentChannelsProps {
  isOutlined: boolean
  cursor: number
  onConnectionSelection?: onConnectionSelectionType
  selectedChannels: Channel[]
}

export const RecentChannels: React.FC<RecentChannelsProps> = ({
  isOutlined,
  cursor,
  onConnectionSelection,
  selectedChannels,
  ...rest
}) => {
  const { data, loading, error } = useQuery<RecentChannelsQuery>(
    recentChannelsQuery
  )

  if (error) {
    return <Indicator label="Error" {...rest} />
  }

  if (loading) {
    return <Indicator label="Loading..." {...rest} />
  }

  if (!data) {
    return null
  }

  const mergedChannels = [...selectedChannels, ...data.me.recent_channels]

  const channels = mergedChannels.reduce(
    (channels, channel) =>
      channels.find(x => x.id === channel.id)
        ? [...channels]
        : [...channels, channel],
    []
  )

  return (
    <>
      <ChannelsList
        channels={channels}
        selectedChannels={selectedChannels}
        onConnectionSelection={onConnectionSelection}
      />
    </>
  )
}
