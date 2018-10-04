import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { SORTS } from 'react/components/Profile/config';

import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

class ProfileMetadataSort extends Component {
  static propTypes = {
    currentRoute: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    // sort: PropTypes.oneOf(SORTS).isRequired,
  }

  isCurrentUpdatedAt = () =>
    // this.props.sort === 'updated_at';
    false

  isCurrentRandom = () =>
    // this.props.sort === 'random';
    false

  render() {
    const { currentRoute: { pathname } } = this.props;

    return (
      <Pocket title="Sort">
        <ProfileLinkUnlessCurrent
          name="sort"
          value="updated_at"
          to={`${pathname}?sort=updated_at`}
          isActive={this.isCurrentUpdatedAt}
        >
          Recently updated
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          name="sort"
          value="random"
          to={`${pathname}?sort=random`}
          isActive={this.isCurrentRandom}
        >
          Random
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default WithCurrentRoute(ProfileMetadataSort);
