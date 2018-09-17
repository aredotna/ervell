import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import ProfilePage from 'react/pages/profile/ProfilePage';

export default () => (
  <Switch>
    <Route
      path="/profile/:id"
      render={parseRoute(({ params }) => <ProfilePage id={params.id} />)}
    />
  </Switch>
);
