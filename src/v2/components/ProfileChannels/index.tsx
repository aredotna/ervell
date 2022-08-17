import React, { useCallback } from 'react'

import InfiniteScroll from 'react-infinite-scroller'

import constants from 'v2/styles/constants'

import profileChannelsQuery from 'v2/components/ProfileChannels/queries/profileChannels'
import profileChannelSearchQuery from 'v2/components/ProfileChannels/queries/profileChannelSearch'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import SearchInput from 'v2/components/UI/SearchInput'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'

import { ChannelsSort, SearchSorts } from '__generated__/globalTypes'
import { FetchPolicy, useQuery } from '@apollo/client'
import useMergeState from 'v2/hooks/useMergeState'
import {
  ProfileChannelsQuery,
  ProfileChannelsQueryVariables,
} from '__generated__/ProfileChannelsQuery'
import {
  ProfileChannelsSearch,
  ProfileChannelsSearchVariables,
} from '__generated__/ProfileChannelsSearch'
import useIsSpiderRequesting from 'v2/hooks/useIsSpiderRequesting'
import { ChannelRowContents } from './components/ChannelRowContents'

interface ProfileChannelsProps {
  id: string
  sort: ChannelsSort | SearchSorts
  fetchPolicy: FetchPolicy
  seed?: number
}

interface ProfileChannelsState {
  page: number
  per: number
  hasMore: boolean
  q?: string
}

export const ProfileChannels: React.FC<ProfileChannelsProps> = ({
  id,
  sort,
  fetchPolicy,
  seed,
}) => {
  const isSpider = useIsSpiderRequesting()
  const [{ page, per, q, hasMore }, setState] = useMergeState<
    ProfileChannelsState
  >({
    page: 1,
    per: 3,
    hasMore: true,
    q: null,
  })

  const isSearch = sort === 'RANDOM' || !!q

  const { data, loading, error, fetchMore } = useQuery<
    ProfileChannelsQuery,
    ProfileChannelsQueryVariables
  >(profileChannelsQuery, {
    variables: { id, sort: sort as ChannelsSort, per, page },
    fetchPolicy,
    skip: isSearch,
    ssr: isSpider,
  })

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    fetchMore: searchFetchMore,
  } = useQuery<ProfileChannelsSearch, ProfileChannelsSearchVariables>(
    profileChannelSearchQuery,
    {
      variables: { id, sort: sort as SearchSorts, q, seed },
      fetchPolicy,
      skip: !isSearch,
    }
  )

  const channelData = isSearch ? searchData : data
  const channelLoading = isSearch ? searchLoading : loading
  const channelError = isSearch ? searchError : error
  const channelFetchMore = isSearch ? searchFetchMore : fetchMore

  const resetQuery = useCallback(
    (query: string) => {
      const q = query === '' ? null : query
      setState({
        page: 1,
        per: 3,
        hasMore: true,
        q,
      })
    },
    [setState]
  )

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { page: page + 1, per },
    }).then(({ errors, data }) => {
      const {
        identity: {
          identifiable: {
            channels: { length },
          },
        },
      } = data
      const hasMore = !errors && length > 0 && length >= per

      setState({
        page: page + 1,
        hasMore,
      })
    })
  }, [page, per, channelFetchMore, setState])

  if (channelError) {
    return <ErrorAlert>{channelError.message}</ErrorAlert>
  }

  if (channelLoading) {
    return (
      <div>
        <SearchInput
          query={q}
          onDebouncedQueryChange={resetQuery}
          placeholder={`Filter channels`}
          mb={6}
          mr={[
            constants.blockGutter,
            constants.doubleBlockGutter,
            constants.doubleBlockGutter,
          ]}
          ml={[constants.blockGutter, 0, 0]}
          border={0}
        />
        <BlocksLoadingIndicator />
      </div>
    )
  }

  const {
    identity: {
      identifiable: { name, channels },
    },
  } = channelData

  return (
    <div>
      <SearchInput
        query={q}
        onDebouncedQueryChange={resetQuery}
        placeholder={`Filter ${name}’s channels`}
        mb={6}
        mr={[
          constants.blockGutter,
          constants.doubleBlockGutter,
          constants.doubleBlockGutter,
        ]}
        ml={[constants.blockGutter, 0, 0]}
        border={0}
      />

      {channelLoading && <BlocksLoadingIndicator />}

      {!channelLoading && channels.length > 0 && (
        <InfiniteScroll
          pageStart={1}
          key={q}
          threshold={800}
          initialLoad={false}
          loader={<BlocksLoadingIndicator key="loading" />}
          hasMore={channels.length >= per && hasMore}
          loadMore={loadMore}
        >
          {channels.map(channel => {
            if (!channel) return null

            return <ChannelRowContents key={channel.id} channel={channel} />
          })}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ProfileChannels
