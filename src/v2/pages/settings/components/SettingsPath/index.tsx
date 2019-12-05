import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'

interface SettingsPathProps {
  name: string
}

const SettingsBreadcrumb: React.FC<SettingsPathProps> = ({ name }) => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>{name}</div>
    </StickyBreadcrumbPath.Crumb>
    <StickyBreadcrumbPath.Crumb>
      <div>Settings</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
)

const SettingsPath: React.FC<SettingsPathProps> = ({ name }) => {
  return (
    <HeaderMetadataContainer breadcrumb={<SettingsBreadcrumb name={name} />} />
  )
}

export default SettingsPath
