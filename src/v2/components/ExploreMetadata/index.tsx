import React, { PureComponent } from 'react'

import Grid from 'v2/components/UI/Grid'
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import ExploreBreadcrumb from 'v2/components/ExploreMetadata/components/ExploreBreadcrumb'
import ExploreMetadataView from 'v2/components/ExploreMetadata/components/ExploreMetadataView'
import ExploreMetadataSort from 'v2/components/ExploreMetadata/components/ExploreMetadataSort'
import ExploreMetdataBlockFilter from 'v2/components/ExploreMetadata/components/ExploreMetadataBlockFilter'

export interface ExploreMetadataProps {
  view: 'all' | 'channels' | 'blocks'
  sort: 'UPDATED_AT' | 'RANDOM'
  block_filter?: 'IMAGE' | 'EMBED' | 'TEXT' | 'ATTACHMENT' | 'LINK'
}

class ExploreMetadata extends PureComponent<ExploreMetadataProps> {
  render() {
    const { view, sort, block_filter } = this.props

    return (
      <HeaderMetadataContainer breadcrumb={<ExploreBreadcrumb />}>
        <Grid>
          <ExploreMetadataView view={view} sort={sort} />
          {view === 'blocks' && (
            <ExploreMetdataBlockFilter
              block_filter={block_filter}
              view={view}
              sort={sort}
            />
          )}
          <ExploreMetadataSort
            view={view}
            sort={sort}
            block_filter={block_filter}
          />
        </Grid>
      </HeaderMetadataContainer>
    )
  }
}

export default ExploreMetadata
