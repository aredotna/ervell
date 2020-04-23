import React from 'react'
import styled, { css } from 'styled-components'

import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import useLoginStatus from 'v2/hooks/useLoginStatus'
import { Link } from 'react-router-dom'

const Options = styled.div``

const linkMixin = css`
  display: block;

  &:not(first-child) {
    color: ${x => x.theme.colors.gray.regular};

    &:hover {
      color: ${x => x.theme.colors.gray.semiBold};
    }
  }
`

const A = styled(Link)`
  ${linkMixin}
`

export const ExploreBreadcrumb: React.FC = () => {
  const me = useSerializedMe()
  const { isLoggedIn } = useLoginStatus()

  const stuckChildren = (
    <StickyBreadcrumbPath.Crumb>Explore</StickyBreadcrumbPath.Crumb>
  )

  return (
    <StickyBreadcrumbPath stuckChildren={stuckChildren}>
      <StickyBreadcrumbPath.Crumb>
        <Options>
          <div>Explore</div>
          {isLoggedIn && <A to="/feed">Feed</A>}
          {isLoggedIn && me && <A to={`/${me.slug}`}>Profile</A>}
        </Options>
      </StickyBreadcrumbPath.Crumb>
    </StickyBreadcrumbPath>
  )
}
