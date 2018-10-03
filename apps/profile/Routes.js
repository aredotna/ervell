import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import ProfilePage from 'react/pages/profile/ProfilePage';

export default () => (
  <Switch>
    <Route
      path="/:id/:view?"
      render={parseRoute(({ params }) => {
        const view = params.view || 'all';
        return <ProfilePage id={params.id} view={view} />;
      })}
    />
  </Switch>
);
