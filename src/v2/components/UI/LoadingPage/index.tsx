import React from 'react'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import Grid from 'v2/components/UI/Grid'
import Pocket from 'v2/components/UI/Pocket'

const LoadingPageBreadCrumb: React.FC = () => {
  return (
    <StickyBreadcrumbPath>
      {() => [
        <StickyBreadcrumbPath.Crumb key="head"></StickyBreadcrumbPath.Crumb>,
      ]}
    </StickyBreadcrumbPath>
  )
}

export const LoadingPage: React.FC = () => {
  return (
    <HeaderMetadataContainer breadcrumb={<LoadingPageBreadCrumb />}>
      <Grid gutterSpacing={2} variableHeight>
        <Pocket title="Info"></Pocket>
      </Grid>
    </HeaderMetadataContainer>
  )
}
