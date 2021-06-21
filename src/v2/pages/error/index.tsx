import React from 'react'
import styled from 'styled-components'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import Grid from 'v2/components/UI/Grid'

export interface Breadcrumbs {
  crumbs: Breadcrumb[]
}

export interface Breadcrumb {
  label: string
}

const Crumb = styled(StickyBreadcrumbPath.Crumb)`
  color: ${x => x.theme.colors.gray.semiLight};

  &:last-child {
    color: ${x => x.theme.colors.gray.semiLight};
  }
`

const ErrorPageBreadCrumb: React.FC = () => {
  return (
    <StickyBreadcrumbPath>
      {() => [<Crumb key="head">Error</Crumb>]}
    </StickyBreadcrumbPath>
  )
}

export const ErrorPage: React.FC = () => {
  return (
    <TopBarLayout>
      <Constrain>
        <HeaderMetadataContainer breadcrumb={<ErrorPageBreadCrumb />}>
          <Grid gutterSpacing={2} variableHeight></Grid>
        </HeaderMetadataContainer>
      </Constrain>
    </TopBarLayout>
  )
}
