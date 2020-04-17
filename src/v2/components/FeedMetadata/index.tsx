import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import { FeedBreadcrumb } from 'v2/components/FeedMetadata/components/FeedBreadcrumb'

export const FeedMetadata: React.FC = () => {
  return <HeaderMetadataContainer breadcrumb={<FeedBreadcrumb />} />
}
