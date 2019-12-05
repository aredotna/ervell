import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import SettingsPage from 'v2/pages/settings'

export default () => (
  <Switch>
    <Route
      path="/settings/billing"
      render={parseRoute(() => (
        <SettingsPage tab="billing" />
      ))}
    />

    <Route
      path="/settings/group_billing"
      render={parseRoute(() => (
        <SettingsPage tab="group_billing" />
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
