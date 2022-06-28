import React from 'react'
import { Routes as Switch, Route, useLocation } from 'react-router-dom'
import ChannelRss from 'v2/pages/rss/ChannelRss'
import ExploreRss from 'v2/pages/rss/ExploreRss'
import UserRss from 'v2/pages/rss/UserRss'

export const Routes = () => {
  const location = useLocation()

  return (
    <>
      <Switch location={location}>
        <Route path="/explore/feed/rss" element={<ExploreRss />} />

        <Route path="/:username/:slug/feed/rss" element={<ChannelRss />} />

        <Route path="/:username/feed/rss" element={<UserRss />} />
      </Switch>
    </>
  )
}
