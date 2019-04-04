import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';

import profileUiStateQuery from 'apps/profile/queries/profileUiState';

import parseRoute from 'react/util/parseRoute';

import ProfilePage from 'react/pages/profile/ProfilePage';

const VALID_SORTS = ['UPDATED_AT', 'RANDOM'];
const VALID_FILTERS = ['OWN', 'COLLABORATION'];

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value;
  return defaultValue;
};

export default () => (
  <Switch>
    <Route
      path="/:id/:view?"
      render={parseRoute(({ params, query }) => (
        <Query query={profileUiStateQuery}>
          {({ data, error }) => {
            if (error) return error.message;

            const { cookies } = data;

            const view = params.view || cookies.view || 'channels';
            const sort = setValid((query.sort || cookies.sort), VALID_SORTS, 'UPDATED_AT');
            const filter = setValid((query.filter || cookies.filter), VALID_FILTERS, 'OWN');

            return (
              <ProfilePage
                id={params.id}
                view={view}
                sort={sort}
                filter={filter}
              />
            );
          }}
        </Query>
      ))}
    />
  </Switch>
);
