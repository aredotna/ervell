import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SORTS } from 'react/components/Home/config';

import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

import Pocket from 'react/components/UI/Pocket';
import HomeMetadataLinkUnlessCurrent from 'react/components/HomeMetadata/components/HomeMetadataLinkUnlessCurrent';

class HomeMetadataSort extends Component {
  static propTypes = {
    currentRoute: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    sort: PropTypes.oneOf(SORTS).isRequired,
  }

  isCurrentUpdatedAt = () =>
    this.props.sort === 'updated_at';

  isCurrentRandom = () =>
    this.props.sort === 'random';

  render() {
    const { currentRoute: { pathname } } = this.props;

    return (
      <Pocket title="Sort">
        <HomeMetadataLinkUnlessCurrent
          href={`${pathname}?sort=updated_at`}
          predicate={this.isCurrentUpdatedAt}
        >
          Recently updated
        </HomeMetadataLinkUnlessCurrent>

        <HomeMetadataLinkUnlessCurrent
          href={`${pathname}?sort=random`}
          predicate={this.isCurrentRandom}
        >
          Random
        </HomeMetadataLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default WithCurrentRoute(HomeMetadataSort);
