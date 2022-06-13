import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
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
  const { data, loading, error } = useQuery<
    AdvancedSearch,
    AdvancedSearchVariables
  >(search, { variables: state.variables })

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  if (loading) {
    return <BlocksLoadingIndicator />
  }

  const contents = data.searches?.advanced.results

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
          // hasMore={contents.length >= per && hasMore}
          // loadMore={this.loadMore(fetchMore)}
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
