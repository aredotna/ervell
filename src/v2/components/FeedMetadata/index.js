import React, { Component } from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import FeedBreadcrumb from 'v2/components/FeedMetadata/components/FeedBreadcrumb'

class FeedMetadata extends Component {
  render() {
    return <HeaderMetadataContainer breadcrumb={<FeedBreadcrumb />} />
  }
}

export default FeedMetadata
