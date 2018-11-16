import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';

import profileUiStateQuery from 'apps/profile/queries/profileUiState';

import parseRoute from 'react/util/parseRoute';

import ProfilePage from 'react/pages/profile/ProfilePage';

export default props => (
  <Switch>
    <Route
      path="/:id/:view?"
      render={parseRoute(({ params, query }) => (
        <Query query={profileUiStateQuery}>
          {({ data, error }) => {
            if (error) return error.message;

            console.log('in the router');

            const { cookies } = data;
            const { seed } = props;

            const view = params.view || cookies.view || 'all';
            const sort = query.sort || cookies.sort || 'UPDATED_AT';
            const filter = query.filter || cookies.filter || 'OWN';

            return (
              <ProfilePage
                id={params.id}
                view={view}
                sort={sort}
                filter={filter}
                seed={seed}
              />
            );
          }}
        </Query>
      ))}
    />
  </Switch>
);
