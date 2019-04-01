import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import exploreUiStateQuery from 'apps/feed/queries/exploreUiState';
import ExplorePage from 'react/pages/explore/ExplorePage';

import FeedPage from 'react/pages/feed/FeedPage';
import NotificationPage from 'react/pages/feed/NotificationPage';

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
        <Query query={exploreUiStateQuery} fetchPolicy="network-only">
          {({ data, error }) => {
            if (error) return error.message;

            const { cookies } = data;

            const view = params.view || (cookies && cookies.view) || 'all';
            const sort = setValid((query.sort || (cookies && cookies.sort)), VALID_SORTS, 'UPDATED_AT');
            const seed = Math.floor(Math.random() * 1000) + 1;

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
    <Route path="/feed" component={FeedPage} />
    <Route path="/notifications" component={NotificationPage} />

    <Route path="/" component={FeedPage} />
  </Switch>
);
