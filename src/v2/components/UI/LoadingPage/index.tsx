import React from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'

import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import Grid from 'v2/components/UI/Grid'
import Pocket from 'v2/components/UI/Pocket'

interface Breadcrumbs {
  crumbs: Breadcrumb[]
}

interface Breadcrumb {
  title: string
}

const Crumb = styled(StickyBreadcrumbPath.Crumb)`
  color: ${x => x.theme.colors.gray.semiLight};

  &:last-child {
    color: ${x => x.theme.colors.gray.semiLight};
  }
`

const LoadingPageBreadCrumb: React.FC = () => {
  const location = useLocation()
  const breadcrumbs: Breadcrumbs =
    location.state &&
    location.state.breadcrumbs &&
    JSON.parse(location.state.breadcrumbs)

  if (breadcrumbs) {
    return (
      <StickyBreadcrumbPath>
        {() =>
          breadcrumbs.crumbs.map((breadcrumb, index) => (
            <Crumb key={`breadcrumb-${index}`}>{breadcrumb.title}</Crumb>
          ))
        }
      </StickyBreadcrumbPath>
    )
  }

  return (
    <StickyBreadcrumbPath>
      {() => [<Crumb key="head"></Crumb>]}
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
