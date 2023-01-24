import React, { useCallback } from 'react'
import exploreContentsQuery from 'v2/components/ExploreContents/queries/exploreContents'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'
import {
  BlockFilterEnum,
  SearchSorts,
  SearchType,
} from '__generated__/globalTypes'
import { FetchPolicy, useQuery } from '@apollo/client'
import useMergeState from 'v2/hooks/useMergeState'
import {
  ExploreContents as ExploreContentsQuery,
  ExploreContentsVariables,
} from '__generated__/ExploreContents'
import useIsSpiderRequesting from 'v2/hooks/useIsSpiderRequesting'

interface ExploreContentsProps {
  type?: SearchType
  sort: SearchSorts
  fetchPolicy: FetchPolicy
  seed?: number
  blockFilter?: BlockFilterEnum
  timestamp: string
}

interface ExploreState {
  page: number
  per: number
  hasMore: boolean
}

export const ExploreContents: React.FC<ExploreContentsProps> = ({
  type,
  sort,
  seed,
  blockFilter,
  timestamp,
}) => {
  const [state, setState] = useMergeState<ExploreState>({
    page: 1,
    per: 12,
    hasMore: true,
  })

  const isSpiderRequesting = useIsSpiderRequesting()

  const { per, hasMore, page } = state

  const { data, error, loading, fetchMore } = useQuery<
    ExploreContentsQuery,
    ExploreContentsVariables
  >(exploreContentsQuery, {
    variables: {
      page,
      per,
      type,
      sort,
      seed,
      block_filter: blockFilter,
      timestamp: timestamp,
    },
    ssr: isSpiderRequesting,
  })

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { page: page + 1 },
    }).then(({ errors, data }) => {
      const {
        contents: { length },
      } = data

      const hasMore = !errors && length > 0 && length >= per

      setState({
        page: page + 1,
        hasMore,
      })
    })
  }, [fetchMore, state, setState])

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  if (loading) {
    return <BlocksLoadingIndicator />
  }

  const { contents } = data

  return (
    <div>
      {loading && <BlocksLoadingIndicator />}

      {!loading && contents.length > 0 && (
        <Grid
          pageStart={1}
          threshold={800}
          initialLoad={true}
          loader={<BlocksLoadingIndicator key="loading" />}
          hasMore={contents.length >= per && hasMore}
          loadMore={loadMore}
        >
          {contents.map(
            blokk =>
              blokk && (
                <Cell.Konnectable
                  key={`${blokk.__typename}_${blokk.id}`}
                  konnectable={blokk}
                  context={contents}
                />
              )
          )}
        </Grid>
      )}
    </div>
  )
}

export default ExploreContents
