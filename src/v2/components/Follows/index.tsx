import React, { useState, useCallback } from 'react'
import { Query } from '@apollo/client/react/components'

import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'

const PER = 12

interface Props<T> {
  query: any
  variables: any
  dataSelector: (data: T) => any
  updateQuery: (
    prevResult: T,
    { fetchMoreResult }: { fetchMoreResult: T }
  ) => any
  fetchPolicy?: any
}

export function Follows<T>({
  query,
  variables,
  dataSelector,
  updateQuery,
  fetchPolicy = 'network-only',
}: Props<T>) {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(
    fetchMore => () => {
      fetchMore({
        variables: { page: page + 1, PER },
        updateQuery,
      }).then(({ errors, data }) => {
        const { length } = dataSelector(data)
        const hasMore = !errors && length > 0 && length >= PER
        setPage(prevPage => prevPage + 1)
        setHasMore(hasMore)
      })
    },
    [dataSelector, page, updateQuery]
  )

  return (
    <Query<T>
      query={query}
      variables={{ ...variables, per: PER }}
      fetchPolicy={fetchPolicy}
      ssr={false}
    >
      {({ loading, error, data, fetchMore }) => {
        if (error) {
          return <ErrorAlert>{error.message}</ErrorAlert>
        }

        if (loading) {
          return <BlocksLoadingIndicator />
        }

        const collection = dataSelector(data)

        return (
          <>
            {collection.length > 0 && (
              <Grid
                pageStart={1}
                threshold={800}
                initialLoad={false}
                loader={<BlocksLoadingIndicator key="loading" />}
                hasMore={collection.length >= PER && hasMore}
                loadMore={loadMore(fetchMore)}
              >
                {collection.map(cell => {
                  return {
                    Channel: (
                      <Cell.Konnectable
                        key={`${cell.__typename}_${cell.id}`}
                        konnectable={cell}
                      />
                    ),
                    User: (
                      <Cell.Identifiable
                        key={`${cell.__typename}_${cell.id}`}
                        identifiable={cell}
                      />
                    ),
                    Group: (
                      <Cell.Identifiable
                        key={`${cell.__typename}_${cell.id}`}
                        identifiable={cell}
                      />
                    ),
                  }[cell.__typename]
                })}
              </Grid>
            )}
          </>
        )
      }}
    </Query>
  )
}
