import React from 'react';
import { Query } from 'react-apollo';
import { Switch, Route } from 'react-router-dom';

import parseRoute from 'react/util/parseRoute';

import searchUiStateQuery from 'apps/search/queries/searchUiState';
import SearchPage from 'react/pages/search/SearchPage';

export default () => (
  <Switch>
    <Route
      path="/search/:term/:view?"
      render={parseRoute(({ params }) => (
        <Query query={searchUiStateQuery}>
          {({ data, error }) => {
            if (error) return error.message;

            const { cookies } = data;

            const view = params.view || cookies.view || 'all';

            return (
              <SearchPage
                term={params.term}
                view={view}
              />
            );
          }}
        </Query>
      ))}
    />
  </Switch>
);
