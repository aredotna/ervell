import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import ChannelPage from 'v2/pages/channel/ChannelPage'
import SharedChannelPage from 'v2/pages/channel/SharedChannelPage'
import ChannelFollowersPage from 'v2/pages/channel/ChannelFollowersPage'
import EmbeddedChannelPage from 'v2/pages/channel/EmbeddedChannelPage'

export default () => (
  <Switch>
    <Route
      path="/new_channel/share/:token"
      render={parseRoute(({ params }) => (
        <SharedChannelPage token={params.token} />
      ))}
    />

    <Route
      path="/new_channel/:user_id/:id/followers"
      render={parseRoute(({ params }) => (
        <ChannelFollowersPage id={params.id} />
      ))}
    />

    <Route
      path="/new_channel/:user_id/:id/embed"
      render={parseRoute(({ params }) => (
        <EmbeddedChannelPage id={params.id} />
      ))}
    />

    <Route
      path="/new_channel/:user_id/:id"
      render={parseRoute(({ params }) => (
        <ChannelPage id={params.id} />
      ))}
    />
  </Switch>
)
