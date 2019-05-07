import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import BlockPage from 'v2/pages/block'

export default () => (
  <Switch>
    <Route
      path="/block/:id"
      render={parseRoute(({ params }) => (
        <BlockPage id={parseInt(params.id, 10)} />
      ))}
    />
  </Switch>
)
