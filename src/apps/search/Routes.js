import React from 'react'
import { Query } from 'react-apollo'
import { Switch, Route } from 'react-router-dom'
import { remove as removeDiacritics } from 'diacritics'

import parseRoute from 'v2/util/parseRoute'

import searchUiStateQuery from 'apps/search/queries/searchUiState'
import SearchPage from 'v2/pages/search/SearchPage'

const VALID_FILTERS = ['IMAGE', 'EMBED', 'TEXT', 'ATTACHMENT', 'LINK']

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value
  return defaultValue
}

export default () => (
  <Switch>
    <Route
      path="/search/:term/:view?"
      render={parseRoute(({ params, query }) => (
        <Query query={searchUiStateQuery}>
          {({ data, error }) => {
            if (error) return error.message

            const { cookies } = data

            const view = params.view || cookies.view || 'all'
            const term = removeDiacritics(params.term)

            const filter = query.block_filter || cookies.block_filter
            const block_filter = setValid(filter, VALID_FILTERS, null)

            return (
              <SearchPage term={term} view={view} block_filter={block_filter} />
            )
          }}
        </Query>
      ))}
    />
  </Switch>
)
