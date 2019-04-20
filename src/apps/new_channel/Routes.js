import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import ChannelPage from 'react/pages/channel';

export default () => (
  <Switch>
    <Route
      path="/new_channel/:user_id/:id"
      render={parseRoute(({ params }) => (
        <ChannelPage
          user_id={params.user_id}
          id={params.id}
        />
      ))}
    />
  </Switch>
);
