import React from 'react';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import ProfilePage from 'react/pages/profile/ProfilePage';

export default () => (
  <Switch>
    <Route
      path="/:id/:view?"
      render={parseRoute(({ params, query }) => {
        const { view = 'all' } = params;
        const { sort = 'UPDATED_AT', filter = 'OWN' } = query;

        return (
          <ProfilePage
            id={params.id}
            view={view}
            sort={sort}
            filter={filter}
          />
        );
      })}
    />
  </Switch>
);
