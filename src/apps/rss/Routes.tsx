import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import ChannelRss from 'v2/pages/rss/ChannelRss'
import ExploreRss from 'v2/pages/rss/ExploreRss'
import UserRss from 'v2/pages/rss/UserRss'
import parseRoute from '../../v2/util/parseRoute'

export const Routes = () => {
  const location = useLocation()

  return (
    <>
      <Switch location={location}>
        <Route
          exact
          path="/explore/feed/rss"
          render={parseRoute(({ params }) => (
            <ExploreRss params={params} />
          ))}
        />

        <Route
          exact
          path="/:username/:slug/feed/rss"
          render={parseRoute(({ params }) => (
            <ChannelRss params={params} />
          ))}
        />

        <Route
          exact
          path="/:username/feed/rss"
          render={parseRoute(({ params }) => (
            <UserRss params={params} />
          ))}
        />
      </Switch>
    </>
  )
}
