import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import { ChannelBreadcrumb } from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb'
import { ChannelSearchPage_channel } from '__generated__/ChannelSearchPage'
import AdvancedSearchFilter from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'

interface ChannelMetadataProps {
  channel: ChannelSearchPage_channel
  view?: 'grid' | 'table'
}

export const ChannelSearchMetadata: React.FC<ChannelMetadataProps> = ({
  channel,
  view,
  ...rest
}) => {
  return (
    <HeaderMetadataContainer
      breadcrumb={<ChannelBreadcrumb channel={channel} />}
      {...rest}
    >
      <AdvancedSearchFilter />
    </HeaderMetadataContainer>
  )
}

export default ChannelSearchMetadata
