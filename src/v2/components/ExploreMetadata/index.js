import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Grid from 'v2/components/UI/Grid'
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import ExploreBreadcrumb from 'v2/components/ExploreMetadata/components/ExploreBreadcrumb'
import ExploreMetadataView from 'v2/components/ExploreMetadata/components/ExploreMetadataView'
import ExploreMetadataSort from 'v2/components/ExploreMetadata/components/ExploreMetadataSort'

class ExploreMetadata extends PureComponent {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  render() {
    const { view, sort } = this.props

    return (
      <HeaderMetadataContainer breadcrumb={<ExploreBreadcrumb />}>
        <Grid>
          <ExploreMetadataView view={view} sort={sort} />
          <ExploreMetadataSort view={view} sort={sort} />
        </Grid>
      </HeaderMetadataContainer>
    )
  }
}

export default ExploreMetadata
