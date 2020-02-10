import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'

import recentChannelsQuery from 'v2/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels'

import { RecentChannelsQuery } from '__generated__/RecentChannelsQuery'
import { onConnectionSelectionType } from 'v2/components/ConnectionSelectionList'

interface RecentChannelsProps {
  isOutlined: boolean
  cursor: number
  onConnectionSelection?: onConnectionSelectionType
}

export const RecentChannels: React.FC<RecentChannelsProps> = ({
  isOutlined,
  cursor,
  onConnectionSelection,
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

  return (
    <>
      <ChannelsList
        channels={data.me.recent_channels}
        onConnectionSelection={onConnectionSelection}
      />
    </>
  )
}
