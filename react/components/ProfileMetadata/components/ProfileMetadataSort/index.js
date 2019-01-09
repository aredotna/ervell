import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

class ProfileMetadataSort extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  isSortActive = sort => () =>
    this.props.sort === sort;

  render() {
    const { location: { pathname } } = this.props;

    return (
      <Pocket title="Sort">
        <ProfileLinkUnlessCurrent
          name="sort"
          value="UPDATED_AT"
          to={{
            pathname,
            search: '?sort=UPDATED_AT',
          }}
          isActive={this.isSortActive('UPDATED_AT')}
        >
          Recently updated
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          name="sort"
          value="RANDOM"
          to={{
            pathname,
            search: `?sort=RANDOM&seed=${Math.floor(Math.random() * 1000) + 1}`,
          }}
          isActive={this.isSortActive('RANDOM')}
        >
          Random
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default withRouter(ProfileMetadataSort);
