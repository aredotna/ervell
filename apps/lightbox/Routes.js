import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import LightboxPage from 'react/pages/lightbox';

export default () => (
  <Switch>
    <Route
      path="/lightbox/:id"
      render={parseRoute(({ params }) => (
        <LightboxPage id={parseInt(params.id, 10)} />
      ))}
    />
  </Switch>
);
