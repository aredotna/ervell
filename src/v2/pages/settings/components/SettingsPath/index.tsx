import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

const SettingsBreadcrumb = () => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>Settings</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
)

const SettingsPath: React.FC = () => {
  return <HeaderMetadataContainer breadcrumb={<SettingsBreadcrumb />} />
}

export default SettingsPath
