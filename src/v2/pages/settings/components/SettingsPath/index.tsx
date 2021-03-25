import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { SerializeMeQueryHook_serializedMe } from '__generated__/SerializeMeQueryHook'

interface SettingsPathProps {
  me: SerializeMeQueryHook_serializedMe
}

const SettingsBreadcrumb: React.FC<SettingsPathProps> = ({ me }) => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <a href={`/${me.slug}`}>{me.name}</a>
    </StickyBreadcrumbPath.Crumb>
    <StickyBreadcrumbPath.Crumb>
      <div>Settings</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
)

const SettingsPath: React.FC = () => {
  const serializedMe = useSerializedMe()
  return (
    <HeaderMetadataContainer
      breadcrumb={<SettingsBreadcrumb me={serializedMe} />}
    />
  )
}

export default SettingsPath
