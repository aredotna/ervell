import React from 'react'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

interface AdvancedSearchMetadataBreadcrumbProps {
  term?: string
}

const AdvancedSearchMetadataBreadcrumb: React.FC<AdvancedSearchMetadataBreadcrumbProps> = ({
  term,
}) => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>{`Search results for '${term}'`}</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
)

export default AdvancedSearchMetadataBreadcrumb
