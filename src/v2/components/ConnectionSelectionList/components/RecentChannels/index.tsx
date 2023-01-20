import React, { useCallback, useEffect, useState } from 'react'
import { ApolloError, useQuery } from '@apollo/client'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'

import recentChannelsQuery from 'v2/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels'

import { OnConnectionSelectionType } from 'v2/components/ConnectionSelectionList'
import { RecentChannelsQuery } from '__generated__/RecentChannelsQuery'
import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

interface RecentChannelsProps {
  isOutlined: boolean
  onConnectionSelection?: OnConnectionSelectionType
  selectedChannels: Channel[]
  searchRef: React.MutableRefObject<any>
  onError?: (error: ApolloError) => void
}

export const RecentChannels: React.FC<RecentChannelsProps> = ({
  isOutlined,
  onConnectionSelection,
  selectedChannels,
  searchRef,
  onError,
  ...rest
}) => {
  const { data, loading, error } = useQuery<RecentChannelsQuery>(
    recentChannelsQuery
  )

  const [channels, setChannels] = useState<Channel[]>([])

  const onEnter = useCallback(
    ({ element }: { element: Channel }) => {
      const isSelected = selectedChannels.find(c => c.id === element.id)
      onConnectionSelection(!isSelected, element)
    },
    [selectedChannels, onConnectionSelection]
  )

  useEffect(() => {
    if (data) {
      // Merge recent channels with selected channels and filter out the duplicates
      const mergedChannels = [...selectedChannels, ...data.me.recent_channels]

      const reducedChannels = mergedChannels.reduce(
        (channels, channel) =>
          channels.find(x => x.id === channel.id)
            ? [...channels]
            : [...channels, channel],
        []
      )

      setChannels(reducedChannels)
    }
  }, [data, setChannels, selectedChannels])

  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error])

  const { index } = useKeyboardListNavigation({
    ref: searchRef,
    list: channels,
    waitForInteractive: true,
    onEnter,
  })

  if (error) {
    return <Indicator label="Error" {...rest} />
  }

  if (loading) {
    return <Indicator label="Loading..." {...rest} />
  }

  if (!data) {
    return null
  }

  return (
    <ChannelsList
      channels={channels}
      selectedChannels={selectedChannels}
      onConnectionSelection={onConnectionSelection}
      highlightedIndex={index}
    />
  )
}
