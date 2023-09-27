import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import { map, flatten } from 'underscore'

import feedQuery from 'v2/components/Feed/queries/feedConnection'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import FeedGroups from 'v2/components/FeedGroups'
import CenteringBox from 'v2/components/UI/CenteringBox'
import {
  FeedConnectionQuery,
  FeedConnectionQueryVariables,
} from '__generated__/FeedConnectionQuery'
import { useQuery } from '@apollo/client'
import { FeedType } from '__generated__/globalTypes'
import useMergeState from 'v2/hooks/useMergeState'

const LoadingContainer = styled(CenteringBox)`
  margin-top: -250px; // Hack for now
`

interface FeedProps {
  type?: FeedType
  onCompleted?: () => void
  limit?: number
}

export const Feed: React.FC<FeedProps> = ({
  type = FeedType.USER,
  onCompleted = () => {},
  limit = 20,
}) => {
  const { loading, error, data, fetchMore } = useQuery<
    FeedConnectionQuery,
    FeedConnectionQueryVariables
  >(feedQuery, {
    variables: { type, limit },
    onCompleted,
    ssr: false,
  })

  const [state, setState] = useMergeState({
    start: data?.me.feed.page_info.next_cursor,
    hasMore: true,
  })

  useEffect(() => {
    setState({
      start: data?.me.feed.page_info.next_cursor,
      hasMore: data?.me.feed.page_info.has_next_page,
    })
  }, [data])

  const { hasMore, start } = state

  const getContext = data => {
    if (!data) return []

    const {
      me: {
        feed: { groups },
      },
    } = data
    return flatten(map(groups, group => group.objects))
  }

  const fetchMoreFeed = useCallback(() => {
    if (!hasMore) return

    fetchMore({
      variables: { limit, start },
    })
  }, [fetchMore, setState, start, hasMore])

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingIndicator p={6} />
      </LoadingContainer>
    )
  }

  if (error) {
    return <ErrorAlert m={6}>{error.message}</ErrorAlert>
  }

  return (
    <InfiniteScroll
      pageStart={1}
      threshhold={1000}
      loader={<BlocksLoadingIndicator key="loading" />}
      hasMore={hasMore}
      loadMore={fetchMoreFeed}
    >
      <FeedGroups groups={data?.me?.feed?.groups} context={getContext(data)} />
    </InfiniteScroll>
  )
}

export default Feed
