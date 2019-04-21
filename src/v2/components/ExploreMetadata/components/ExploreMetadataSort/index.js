import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Pocket from 'v2/components/UI/Pocket';
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent';

class ExploreMetadataSort extends Component {
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
        <CookieLinkUnlessCurrent
          name="sort"
          value="UPDATED_AT"
          isActive={this.isSortActive('UPDATED_AT')}
          prefix="Explore"
          to={{
            pathname,
            search: '?sort=UPDATED_AT',
          }}
        >
          Recently updated
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="sort"
          value="RANDOM"
          isActive={this.isSortActive('RANDOM')}
          prefix="Explore"
          to={{
            pathname,
            search: '?sort=RANDOM',
          }}
          rel="nofollow"
        >
          Random
        </CookieLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default withRouter(ExploreMetadataSort);
