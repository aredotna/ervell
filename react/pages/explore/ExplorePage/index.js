import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExploreMetadata from 'react/components/ExploreMetadata';
import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import ExploreViews from 'react/pages/explore/ExplorePage/components/ExploreViews';
import LoggedOutCTA from 'react/components/LoggedOutCTA';
import LoggedOutExploreContent from 'react/components/LoggedOutCTA/components/LoggedOutExploreContent';

export default class ProfilePage extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    seed: PropTypes.number.isRequired,
  }

  render() {
    const {
      view, sort, seed,
    } = this.props;

    return (
      <ErrorBoundary>
        <div>
          <ExploreMetadata
            view={view}
            sort={sort}
          />

          <ExploreViews
            view={view}
            sort={sort}
            seed={seed}
          />

          <LoggedOutCTA>
            <LoggedOutExploreContent />
          </LoggedOutCTA>
        </div>
      </ErrorBoundary>
    );
  }
}
