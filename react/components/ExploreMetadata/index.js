import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'react/components/UI/Grid';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import ExploreBreadcrumb from 'react/components/ExploreMetadata/components/ExploreBreadcrumb';
import ExploreMetadataView from 'react/components/ExploreMetadata/components/ExploreMetadataView';
import ExploreMetadataSort from 'react/components/ExploreMetadata/components/ExploreMetadataSort';

class ExploreMetadata extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  render() {
    const { view, sort } = this.props;

    return (
      <HeaderMetadataContainer
        breadcrumb={<ExploreBreadcrumb />}
      >
        <Grid>
          <ExploreMetadataView view={view} sort={sort} />
          <ExploreMetadataSort view={view} sort={sort} />
        </Grid>
      </HeaderMetadataContainer>
    );
  }
}

export default ExploreMetadata;
