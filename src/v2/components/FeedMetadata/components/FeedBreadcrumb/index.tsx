import React from 'react'
import styled, { css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

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

const Option = styled(Link)`
  ${linkMixin}
`
export const FeedBreadcrumb: React.FC = () => {
  const { pathname } = useLocation()
  const me = useSerializedMe()

  const FeedOptions = (
    <Options>
      <div>Feed</div>
      <Option to="/explore">Explore</Option>
      {me && (
        <Option to={`/${me.slug}`} state={getBreadcrumbPath(me)}>
          Profile
        </Option>
      )}
    </Options>
  )

  const stuckChildren = (
    <StickyBreadcrumbPath.Crumb>
      {
        {
          '/': 'Feed',
          '/feed': 'Feed',
          '/notifications': 'Notifications',
        }[pathname]
      }
    </StickyBreadcrumbPath.Crumb>
  )

  return (
    <StickyBreadcrumbPath stuckChildren={stuckChildren}>
      <StickyBreadcrumbPath.Crumb>
        {
          {
            '/': FeedOptions,
            '/feed': FeedOptions,
            '/notifications': 'Notifications',
          }[pathname]
        }
      </StickyBreadcrumbPath.Crumb>
    </StickyBreadcrumbPath>
  )
}
