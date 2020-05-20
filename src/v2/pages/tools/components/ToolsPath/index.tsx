import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

const ToolsBreadcrumb: React.FC = () => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>Tools</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
)

const ToolsPath: React.FC = () => {
  return <HeaderMetadataContainer breadcrumb={<ToolsBreadcrumb />} />
}

export default ToolsPath
