import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import Constrain from 'react/components/UI/Constrain';

import ExploreViews from 'react/pages/explore/ExplorePage/components/ExploreViews';

import ExploreMetadata from 'react/components/ExploreMetadata';
import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import BottomBanner from 'react/components/BottomBanner';
import Title from 'react/components/UI/Head/components/Title';

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
        <Title>Explore</Title>

        <TopBarLayout>
          <Constrain>
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
          </Constrain>
        </TopBarLayout>
      </ErrorBoundary>
    );
  }
}
