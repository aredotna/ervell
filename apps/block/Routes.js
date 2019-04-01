import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import BlockPage from 'react/pages/block';

export default () => (
  <Switch>
    <Route
      path="/block/:id"
      render={parseRoute(({ params }) => (
        <BlockPage id={parseInt(params.id, 10)} />
      ))}
    />
  </Switch>
);
