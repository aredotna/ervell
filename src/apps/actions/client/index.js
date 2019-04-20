import sharify from 'sharify';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { mountWithApolloProvider } from 'react/apollo';

import WithStaticRouter from 'react/hocs/WithStaticRouter';

import TransferChannelConfirmedPage from 'react/pages/actions/TransferChannelConfirmedPage';
import TransferChannelRejectedPage from 'react/pages/actions/TransferChannelRejectedPage';
import TransferChannelNotFoundPage from 'react/pages/actions/TransferChannelNotFoundPage';
import TransferChannelAccessDeniedPage from 'react/pages/actions/TransferChannelAccessDeniedPage';

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
));

const { data: { APOLLO, STATUS_CODE } } = sharify;

export default () => {
  const mountPoint = document.getElementById('apolloMount');

  const Component = {
    UNAUTHORIZED: TransferChannelAccessDeniedPage,
    NOT_FOUND: TransferChannelNotFoundPage,
    OK: Routes,
  }[STATUS_CODE];

  mountWithApolloProvider(Component, APOLLO, mountPoint);
};
