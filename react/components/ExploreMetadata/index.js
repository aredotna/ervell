import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'react/components/UI/Grid';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import HomeBreadcrumb from 'react/components/HomeMetadata/components/HomeBreadcrumb';
import HomeMetadataView from 'react/components/HomeMetadata/components/HomeMetadataView';
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
        breadcrumb={<HomeBreadcrumb />}
      >
        <Grid>
          <HomeMetadataView view={view} sort={sort} />
          <ExploreMetadataSort view={view} sort={sort} />
        </Grid>
      </HeaderMetadataContainer>
    );
  }
}

export default ExploreMetadata;
