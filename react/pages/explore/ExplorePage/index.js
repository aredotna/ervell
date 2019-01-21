import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import CenteringBox from 'react/components/UI/CenteringBox';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ExploreMetadata from 'react/components/ExploreMetadata';
import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import ErrorAlert from 'react/components/UI/ErrorAlert';
// import ProfileViews from 'react/pages/profile/ProfilePage/components/ProfileViews';
import LoggedOutCTA from 'react/components/LoggedOutCTA';

import profilePageQuery from 'react/pages/profile/ProfilePage/queries/profilePage';

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    seed: PropTypes.number.isRequired,
  }

  render() {
    const {
      id, view, sort, seed,
    } = this.props;

    return (
      <ErrorBoundary>
        <div>
          <ExploreMetadata
            view={view}
            sort={sort}
          />

          {/* <ExploreViews
            view={typedView}
            sort={sort}
            seed={seed}
          /> */}

          <LoggedOutCTA />
        </div>
      </ErrorBoundary>
    );
  }
}
