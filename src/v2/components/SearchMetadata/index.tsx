import React from 'react'

import Grid from 'v2/components/UI/Grid'
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import SearchMetadataBreadcrumb from 'v2/components/SearchMetadata/components/SearchMetadataBreadcrumb'
import SearchMetadataModeView from 'v2/components/SearchMetadata/components/SearchMetadataModeView'
import SearchMetadataBlockFilter from 'v2/components/SearchMetadata/components/SearchMetadataBlockFilter'

export interface SearchMetadataProps {
  term?: string
  view?: 'all' | 'channels' | 'blocks' | 'users' | 'groups'
  block_filter?: 'IMAGE' | 'EMBED' | 'TEXT' | 'ATTACHMENT' | 'LINK'
}

const SearchMetadata: React.FC<SearchMetadataProps> = ({
  term,
  view,
  block_filter,
}) => (
  <HeaderMetadataContainer
    breadcrumb={<SearchMetadataBreadcrumb term={term} />}
  >
    <Grid>
      <SearchMetadataModeView
        term={term}
        view={view}
        block_filter={block_filter}
      />

      {view === 'blocks' && (
        <SearchMetadataBlockFilter block_filter={block_filter} />
      )}
    </Grid>
  </HeaderMetadataContainer>
)

export default SearchMetadata
