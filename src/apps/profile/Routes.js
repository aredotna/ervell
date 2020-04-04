import React from 'react'
import { Switch, Route } from 'react-router-dom'
import parseRoute from 'v2/util/parseRoute'
import ProfilePage from 'v2/pages/profile/ProfilePage'

export default () => (
  <Switch>
    <Route
      path="/:id/:view?"
      render={parseRoute(({ params, query }) => (
        <ProfilePage params={params} query={query} />
      ))}
    />
  </Switch>
)
