import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import exploreUiStateQuery from 'apps/explore/queries/exploreUiState';
import ExplorePage from 'react/pages/explore/ExplorePage';

const VALID_SORTS = ['UPDATED_AT', 'RANDOM'];

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value;
  return defaultValue;
};

export default () => (
  <Switch>
    <Route
      path="/explore/:view?"
      render={parseRoute(({ params, query }) => (
        <Query query={exploreUiStateQuery}>
          {({ data, error }) => {
            if (error) return error.message;

            const { cookies } = data;

            const view = params.view || cookies.view || 'all';
            const sort = setValid((query.sort || cookies.sort), VALID_SORTS, 'UPDATED_AT');
            const seed = parseInt(query.seed, 10) || 0;

            return (
              <ExplorePage
                view={view}
                sort={sort}
                seed={seed}
              />
            );
          }}
        </Query>
      ))}
    />
  </Switch>
);
