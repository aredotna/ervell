import { NetworkStatus, useQuery } from '@apollo/client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { merge } from 'lodash'

import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

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
import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'

interface Props {
  initialScope?: {
    where: WhereEnum
    id?: string
  }
}

const DEFAULTS = (hasId: boolean): AdvancedSearchVariables => ({
  page: 1,
  per: 6,
  fields: {
    facets: [FieldsEnum.ALL],
  },
  what: {
    facets: hasId ? [WhatEnum.CHANNEL, WhatEnum.BLOCK] : [WhatEnum.ALL],
  },
})

export const AdvancedSearchResultsGrid: React.FC<Props> = ({
  initialScope,
}) => {
  const { state, setTotal } = useContext(AdvancedSearchContext)
  const [page, setPage] = useState<number>(1)

  const extraVariables = initialScope
    ? {
        where: [
          { facet: initialScope.where, id: initialScope.id },
          ...state.variables.where,
        ],
      }
    : {}

  const variables: AdvancedSearchVariables = {
    ...state.variables,
    ...extraVariables,
  }

  const { data, loading, error, refetch, networkStatus, fetchMore } = useQuery<
    AdvancedSearch,
    AdvancedSearchVariables
  >(search, {
    variables,
    ssr: false,
  })

  useEffect(() => {
    setPage(1)
    const mergedVariables = merge(
      DEFAULTS(!!(variables?.where && variables?.where[0]?.id)),
      variables,
      {
        per: 10,
        page: 1,
      }
    ) as any
    refetch(mergedVariables)
  }, [state.variables])

  useEffect(() => {
    setTotal(data?.searches.advanced.total)
  }, [data?.searches.advanced.total])

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { ...state.variables, page: page + 1 },
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
