import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout';
import Constrain from 'v2/components/UI/Constrain';

import ExploreViews from 'v2/pages/explore/ExplorePage/components/ExploreViews';

import ExploreMetadata from 'v2/components/ExploreMetadata';
import ErrorBoundary from 'v2/components/UI/ErrorBoundary';
import BottomBanner from 'v2/components/BottomBanner';
import Title from 'v2/components/UI/Head/components/Title';

export default class ExplorePage extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  };

  render() {
    const { view, sort } = this.props;

    return (
      <ErrorBoundary>
        <Title>Explore</Title>

        <TopBarLayout>
          <Constrain>
            <ExploreMetadata view={view} sort={sort} />

            <ExploreViews view={view} sort={sort} />

            <BottomBanner banner="LOGGED_OUT_EXPLORE" />
          </Constrain>
        </TopBarLayout>
      </ErrorBoundary>
    );
  }
}
