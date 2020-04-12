import React from 'react'
import { Switch, Route } from 'react-router-dom'

import parseRoute from 'v2/util/parseRoute'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { AcceptInvitePage } from 'v2/pages/accept_invite/AcceptInvitePage'

export default () => (
  <BlankLayout>
    <Switch>
      <Route
        path="/i/:code"
        render={parseRoute(({ params }) => (
          <AcceptInvitePage code={params.code} />
        ))}
      />
    </Switch>
  </BlankLayout>
)
