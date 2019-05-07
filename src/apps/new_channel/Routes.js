import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import ChannelPage from 'v2/pages/channel'
import SharedChannelPage from 'v2/pages/shared_channel'

export default () => (
  <Switch>
    <Route
      path="/new_channel/share/:token"
      render={parseRoute(({ params }) => (
        <SharedChannelPage token={params.token} />
      ))}
    />
    <Route
      path="/new_channel/:user_id/:id"
      render={parseRoute(({ params }) => (
        <ChannelPage user_id={params.user_id} id={params.id} />
      ))}
    />
  </Switch>
)
