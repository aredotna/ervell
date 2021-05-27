import React from 'react'
import { useQuery } from '@apollo/client'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'
import { CreatePrivateChannelButton } from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton'
import { OnConnectionSelectionType } from 'v2/components/ConnectionSelectionList'

import SEARCHED_CHANNELS_QUERY from 'v2/components/ConnectionSelectionList/components/SearchedChannels/queries/searchedChannels'
import {
  SearchedChannelsQuery,
  SearchedChannelsQueryVariables,
} from '__generated__/SearchedChannelsQuery'

interface SearchedChannelsProps {
  query: string
  onConnectionSelection: OnConnectionSelectionType
  includeOpenChannels: boolean
}

export const SearchedChannelsResults: React.FC<SearchedChannelsProps> = ({
  query,
  onConnectionSelection,
  includeOpenChannels,
}) => {
  const { data, error, loading } = useQuery<
    SearchedChannelsQuery,
    SearchedChannelsQueryVariables
  >(SEARCHED_CHANNELS_QUERY, { variables: { query, includeOpenChannels } })

  if (error) return <Indicator label="Error" />
  if (loading) return <Indicator label="Searching..." />
  if (!data) return null

  const {
    me: { searched_channels },
  } = data

  return (
    <ChannelsList
      channels={searched_channels}
      onConnectionSelection={onConnectionSelection}
    />
  )
}

export const SearchedChannels: React.FC<SearchedChannelsProps> = ({
  query,
  onConnectionSelection,
  includeOpenChannels,
}) => {
  return (
    <div>
      <CreatePrivateChannelButton
        title={query}
        onConnectionCreation={onConnectionSelection}
        highlighted={false}
      />
      <SearchedChannelsResults
        query={query}
        onConnectionSelection={onConnectionSelection}
        includeOpenChannels={includeOpenChannels}
      />
    </div>
  )
}

export default SearchedChannels
