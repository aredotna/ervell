import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import SettingsPage from 'v2/pages/settings'

export default () => (
  <Switch>
    <Route
      path="/settings/:tab"
      render={parseRoute(({ params }) => (
        <SettingsPage tab={params.tab} />
      ))}
    />

    <Route
      path="/settings"
      render={parseRoute(() => (
        <SettingsPage tab="general" />
      ))}
    />
  </Switch>
)
