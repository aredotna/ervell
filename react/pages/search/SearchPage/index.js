import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchMetadata from 'react/components/SearchMetadata';
import SearchViews from 'react/pages/search/SearchPage/components/SearchViews';

import ErrorBoundary from 'react/components/UI/ErrorBoundary';

export default class SearchPage extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'groups', 'users']).isRequired,
    term: PropTypes.string.isRequired,
  }

  render() {
    const {
      view, term,
    } = this.props;

    return (
      <ErrorBoundary>
        <div>
          <SearchMetadata
            term={term}
            view={view}
          />

          <SearchViews
            term={term}
            view={view}
          />
        </div>
      </ErrorBoundary>
    );
  }
}
