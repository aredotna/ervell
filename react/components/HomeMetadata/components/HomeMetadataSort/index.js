import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SORTS } from 'react/components/Home/config';

import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

import Pocket from 'react/components/UI/Pocket';
import HeaderMetadataLinkUnlessCurrent from 'react/components/UI/HeaderMetadata/HeaderMetadataLinkUnlessCurrent';

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
        <HeaderMetadataLinkUnlessCurrent
          href={`${pathname}?sort=updated_at`}
          predicate={this.isCurrentUpdatedAt}
        >
          Recently updated
        </HeaderMetadataLinkUnlessCurrent>

        <HeaderMetadataLinkUnlessCurrent
          href={`${pathname}?sort=random`}
          predicate={this.isCurrentRandom}
        >
          Random
        </HeaderMetadataLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default WithCurrentRoute(HomeMetadataSort);
