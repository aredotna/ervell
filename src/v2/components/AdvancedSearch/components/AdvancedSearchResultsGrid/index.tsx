import { NetworkStatus, useQuery } from '@apollo/client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AdvancedSearchContext } from '../../AdvancedSearchContext'

import SearchEmptyMessage from 'v2/components/SearchEmptyMessage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'

import {
  AdvancedSearch,
  AdvancedSearchVariables,
} from '__generated__/AdvancedSearch'
import search from '../../queries/search'

export const AdvancedSearchResultsGrid: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)
  const [page, setPage] = useState<number>(1)

  const { data, loading, error, refetch, networkStatus, fetchMore } = useQuery<
    AdvancedSearch,
    AdvancedSearchVariables
  >(search, {
    variables: { ...state.variables },
  })

  useEffect(() => {
    setPage(1)
    refetch(state.variables)
  }, [state.variables])

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { ...state.variables, page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }
        const merged = {
          ...prev,
          ...fetchMoreResult,
          searches: {
            ...prev.searches,
            ...fetchMoreResult.searches,
            advanced: {
              ...prev.searches.advanced,
              ...fetchMoreResult.searches.advanced,
              results: [
                ...prev.searches.advanced.results,
                ...fetchMoreResult.searches.advanced.results,
              ],
            },
          },
        }
        return merged
      },
    }).then(res => {
      if (res.data.searches.advanced.results.length > 0) {
        setPage(page + 1)
      }
    })
  }, [page, state.variables])

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  if (
    loading ||
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch
  ) {
    return <BlocksLoadingIndicator />
  }

  const contents = data?.searches?.advanced.results || []

  return (
    <div>
      {loading && <BlocksLoadingIndicator />}

      {!loading && contents.length === 0 && (
        <SearchEmptyMessage term={state.variables.term?.facet} />
      )}

      {!loading && contents.length > 0 && (
        <Grid
          pageStart={1}
          threshold={800}
          initialLoad={false}
          loader={<BlocksLoadingIndicator key="loading" />}
          hasMore={contents.length < data.searches?.advanced.total}
          loadMore={loadMore}
        >
          {contents.map(
            cell =>
              cell &&
              {
                Image: () => (
                  <Cell.Konnectable
                    key={`${cell.__typename}_${cell.id}`}
                    konnectable={cell}
                    context={contents}
                  />
                ),
                Attachment: () => (
                  <Cell.Konnectable
                    key={`${cell.__typename}_${cell.id}`}
                    konnectable={cell}
                    context={contents}
                  />
                ),
                Text: () => (
                  <Cell.Konnectable
                    key={`${cell.__typename}_${cell.id}`}
                    konnectable={cell}
                    context={contents}
                  />
                ),
                Link: () => (
                  <Cell.Konnectable
                    key={`${cell.__typename}_${cell.id}`}
                    konnectable={cell}
                    context={contents}
                  />
                ),
                Embed: () => (
                  <Cell.Konnectable
                    key={`${cell.__typename}_${cell.id}`}
                    konnectable={cell}
                    context={contents}
                  />
                ),
                Channel: () => (
                  <Cell.Konnectable
                    key={`${cell.__typename}_${cell.id}`}
                    konnectable={cell}
                    context={contents}
                  />
                ),
                User: () => (
                  <Cell.Identifiable
                    key={`${cell.__typename}_${cell.id}`}
                    identifiable={cell}
                    context={contents}
                  />
                ),
                Group: () => (
                  <Cell.Identifiable
                    key={`${cell.__typename}_${cell.id}`}
                    identifiable={cell}
                    context={contents}
                  />
                ),
              }[cell.__typename]()
          )}
        </Grid>
      )}
    </div>
  )
}
