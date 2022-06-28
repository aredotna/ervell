import sharify from 'sharify'
import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import { mountWithApolloProvider } from 'v2/apollo'

import WithStaticRouter from 'v2/hocs/WithStaticRouter'

import TransferChannelConfirmedPage from 'v2/pages/actions/TransferChannelConfirmedPage'
import TransferChannelRejectedPage from 'v2/pages/actions/TransferChannelRejectedPage'
import TransferChannelNotFoundPage from 'v2/pages/actions/TransferChannelNotFoundPage'
import TransferChannelAccessDeniedPage from 'v2/pages/actions/TransferChannelAccessDeniedPage'

const Routes = WithStaticRouter(props => (
  <Switch>
    <Route
      path="/actions/transfer-channel/reject/:token"
      render={() => <TransferChannelRejectedPage {...props} />}
    />
    <Route
      path="/actions/transfer-channel/confirm/:token"
      render={() => <TransferChannelConfirmedPage {...props} />}
    />
  </Switch>
))

const {
  data: { APOLLO, STATUS_CODE },
} = sharify

export default () => {
  const mountPoint = document.getElementById('apolloMount')

  const Component = {
    UNAUTHORIZED: TransferChannelAccessDeniedPage,
    NOT_FOUND: TransferChannelNotFoundPage,
    OK: Routes,
  }[STATUS_CODE]

  mountWithApolloProvider(Component, APOLLO, mountPoint)
}
