import React from 'react'
import { Query } from 'react-apollo'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import exploreUiStateQuery from 'apps/feed/queries/exploreUiState'
import ExplorePage from 'v2/pages/explore/ExplorePage'

import FeedPage from 'v2/pages/feed/FeedPage'
import NotificationPage from 'v2/pages/feed/NotificationPage'

const VALID_SORTS = ['UPDATED_AT', 'RANDOM']
const VALID_FILTERS = ['IMAGE', 'EMBED', 'TEXT', 'ATTACHMENT', 'LINK']

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value
  return defaultValue
}

export default () => (
  <Switch>
    <Route
      path="/explore/:view?"
      render={parseRoute(({ params, query }) => (
        <Query query={exploreUiStateQuery} fetchPolicy="network-only">
          {({ data, error }) => {
            if (error) return error.message
            if (!data) return null

            const { cookies } = data

            const view = params.view || (cookies && cookies.view) || 'all'
            const sort = setValid(
              query.sort || (cookies && cookies.sort),
              VALID_SORTS,
              'UPDATED_AT'
            )

            const filter =
              query.block_filter || (cookies && cookies.block_filter) || null
            const block_filter = setValid(filter, VALID_FILTERS, null)

            return (
              <ExplorePage
                view={view}
                sort={sort}
                block_filter={block_filter}
              />
            )
          }}
        </Query>
      ))}
    />
    <Route path="/feed" component={FeedPage} />
    <Route path="/notifications" component={NotificationPage} />

    <Route path="/" component={FeedPage} />
  </Switch>
)
