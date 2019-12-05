import React from 'react'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

import { SearchMetadataProps } from 'v2/components/SearchMetadata'

const SearchMetadataBreadcrumb: React.FC<SearchMetadataProps> = ({ term }) => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>{`Search results for '${term}'`}</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
)

export default SearchMetadataBreadcrumb
