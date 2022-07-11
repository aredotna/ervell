import React from 'react'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

interface AdvancedSearchMetadataBreadcrumbProps {
  term?: string
}

const AdvancedSearchMetadataBreadcrumb: React.FC<AdvancedSearchMetadataBreadcrumbProps> = ({
  term,
}) => {
  const searchLabel = term ? `Search results for '${term}'` : 'All'

  return (
    <StickyBreadcrumbPath>
      <StickyBreadcrumbPath.Crumb>
        <div>{searchLabel}</div>
      </StickyBreadcrumbPath.Crumb>
    </StickyBreadcrumbPath>
  )
}

export default AdvancedSearchMetadataBreadcrumb
