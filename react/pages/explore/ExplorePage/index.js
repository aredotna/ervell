import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExploreViews from 'react/pages/explore/ExplorePage/components/ExploreViews';

import ExploreMetadata from 'react/components/ExploreMetadata';
import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import BottomBanner from 'react/components/BottomBanner';

export default class ExplorePage extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    seed: PropTypes.number.isRequired,
  }

  render() {
    const { view, sort, seed } = this.props;

    return (
      <ErrorBoundary>
        <ExploreMetadata
          view={view}
          sort={sort}
        />

        <ExploreViews
          view={view}
          sort={sort}
          seed={seed}
        />

        <BottomBanner banner="LOGGED_OUT_EXPLORE" />
      </ErrorBoundary>
    );
  }
}
