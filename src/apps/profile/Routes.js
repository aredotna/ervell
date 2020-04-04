import React from 'react'
import { Switch, Route } from 'react-router-dom'
import parseRoute from 'v2/util/parseRoute'
import ProfilePage from 'v2/pages/profile/ProfilePage'
import { AcceptInvitePage } from 'v2/pages/accept_invite/AcceptInvitePage'

export default () => (
  <Switch>
    <Route
      path="/group/:id/invite/:code"
      render={parseRoute(({ params }) => (
        <AcceptInvitePage code={params.code} />
      ))}
    />
    <Route
      path="/:id/:view?"
      render={parseRoute(({ params, query }) => (
        <ProfilePage params={params} query={query} />
      ))}
    />
  </Switch>
)
