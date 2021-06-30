import React, { useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'
import {
  CreatePrivateChannelButton,
  Mode,
} from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton'
import { OnConnectionSelectionType } from 'v2/components/ConnectionSelectionList'
import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

import SEARCHED_CHANNELS_QUERY from 'v2/components/ConnectionSelectionList/components/SearchedChannels/queries/searchedChannels'
import {
  SearchedChannelsQuery,
  SearchedChannelsQueryVariables,
} from '__generated__/SearchedChannelsQuery'

import {
  createPrivateChannelMutation as CreatePrivateChannelMutation,
  createPrivateChannelMutationVariables as CreatePrivateChannelMutationVariables,
} from '__generated__/createPrivateChannelMutation'
import createPrivateChannelMutation from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton/mutations/createPrivateChannel'

interface SearchedChannelsProps {
  query: string
  onConnectionSelection: OnConnectionSelectionType
  includeOpenChannels: boolean
  selectedChannels: Channel[]
  searchRef: React.MutableRefObject<any>
}

interface SearchedChannelsResultsProps {
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>
  highlightedIndex: number
}

export const SearchedChannelsResults: React.FC<SearchedChannelsProps &
  SearchedChannelsResultsProps> = ({
  query,
  onConnectionSelection,
  includeOpenChannels,
  setChannels,
  selectedChannels,
  highlightedIndex,
}) => {
  const { data, error, loading } = useQuery<
    SearchedChannelsQuery,
    SearchedChannelsQueryVariables
  >(SEARCHED_CHANNELS_QUERY, { variables: { query, includeOpenChannels } })

  useEffect(() => {
    if (data) {
      setChannels([null, ...data.me.searched_channels])
    }
  }, [data, setChannels])

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
      highlightedIndex={highlightedIndex}
      selectedChannels={selectedChannels}
    />
  )
}

export const SearchedChannels: React.FC<SearchedChannelsProps> = ({
  query,
  onConnectionSelection,
  includeOpenChannels,
  searchRef,
  selectedChannels,
}) => {
  const [channels, setChannels] = useState<Channel[] | null[]>([])
  const [mode, setMode] = useState<Mode>('resting')

  const [createPrivateChannel] = useMutation<
    CreatePrivateChannelMutation,
    CreatePrivateChannelMutationVariables
  >(createPrivateChannelMutation)

  const createAndConnect = useCallback(() => {
    setMode('creating')

    createPrivateChannel({ variables: { title: query } })
      .then(
        ({
          data: {
            create_channel: { channel: newChannel },
          },
        }) => {
          setMode('connecting')
          return onConnectionSelection(true, newChannel)
        }
      )
      .then(() => {
        setMode('done')
      })
      .catch(err => {
        console.error(err)
        setMode('error')
      })
  }, [createPrivateChannel, onConnectionSelection, query])

  const onEnter = useCallback(
    ({ index, element }: { index: number; element: Channel }) => {
      if (index === 0) {
        return createAndConnect()
      }

      const isSelected = selectedChannels.find(c => c.id === element.id)
      onConnectionSelection(!isSelected, element)
    },
    [createAndConnect, onConnectionSelection, selectedChannels]
  )

  const { index } = useKeyboardListNavigation({
    ref: searchRef,
    list: channels,
    waitForInteractive: true,
    onEnter,
  })

  return (
    <div>
      <CreatePrivateChannelButton
        title={query}
        onConnectionCreation={onConnectionSelection}
        highlighted={index === 0}
        mode={mode}
      />
      <SearchedChannelsResults
        query={query}
        onConnectionSelection={onConnectionSelection}
        includeOpenChannels={includeOpenChannels}
        setChannels={setChannels}
        selectedChannels={selectedChannels}
        searchRef={searchRef}
        highlightedIndex={index === 0 ? -1 : index - 1}
      />
    </div>
  )
}

export default SearchedChannels
