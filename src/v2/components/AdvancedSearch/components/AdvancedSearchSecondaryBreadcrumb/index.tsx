import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import {
  Crumb,
  CrumbContainer,
  FirstCrumb,
} from 'v2/components/UI/BreadcrumbPath'

import { Where } from '__generated__/globalTypes'
import {
  SecondaryUserBreadcrumbQuery,
  SecondaryUserBreadcrumbQueryVariables,
} from '__generated__/SecondaryUserBreadcrumbQuery'
import secondaryUserBreadcrumbQuery from './queries/secondaryUserBreadcrumbQuery'

const A = styled.a``

interface SecondaryBreadcrumbProps {
  where: Where
}

export const SecondaryBreadcrumb: React.FC<SecondaryBreadcrumbProps> = ({
  where,
}) => {
  if (where.facet === 'USER') {
    return <SecondaryUserBreadcrumb where={where} />
  }

  return null
}

export const SecondaryUserBreadcrumb: React.FC<SecondaryBreadcrumbProps> = ({
  where,
}) => {
  const { data, loading } = useQuery<
    SecondaryUserBreadcrumbQuery,
    SecondaryUserBreadcrumbQueryVariables
  >(secondaryUserBreadcrumbQuery, {
    variables: {
      user_id: where.id,
    },
  })

  if (loading) {
    return (
      <CrumbContainer>
        <FirstCrumb>+</FirstCrumb>
        <Crumb>
          <A href="/">Loading...</A>
        </Crumb>
      </CrumbContainer>
    )
  }

  return (
    <CrumbContainer>
      <Crumb>
        <A href={data.user.slug}>&mdash; owned by {data.user.name} only</A>
      </Crumb>
    </CrumbContainer>
  )
}
