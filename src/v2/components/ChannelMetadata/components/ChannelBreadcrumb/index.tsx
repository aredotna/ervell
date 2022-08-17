import React from 'react'
import styled from 'styled-components'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

import ColoredChannelLink from 'v2/components/UI/ColoredChannelLink'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import BorderedLock from 'v2/components/UI/BorderedLock'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { ChannelBreadcrumb as Channel } from '__generated__/ChannelBreadcrumb'
import { unescape } from 'lodash'

const CollaboratorCount = styled.span`
  font-weight: normal;
`

const A = styled.a``

interface ChannelBreadcrumbProps {
  channel: Channel
}

export const ChannelBreadcrumb: React.FC<ChannelBreadcrumbProps> = ({
  channel,
}) => {
  const [params] = useSearchParams()
  const location = useLocation()
  const pathname = location?.pathname
  const useRealLink = pathname?.includes('/share/')

  const showBadge = !/search$/.test(pathname)

  const searchTerm = params.get('term[facet]')
  const searchLabel = searchTerm
    ? `Search results for '${searchTerm}'`
    : 'All results'

  const props = useRealLink
    ? { href: channel.owner.href }
    : { to: channel.owner.href, state: getBreadcrumbPath(channel.owner) }
  const Tag = useRealLink ? A : Link

  return (
    <StickyBreadcrumbPath>
      {({ mode }) => [
        <StickyBreadcrumbPath.Crumb key="head">
          <Tag {...props}>
            {unescape(channel.owner.name)}

            {channel.counts.collaborators > 0 && (
              <CollaboratorCount>
                {' '}
                (+{channel.counts.collaborators})
              </CollaboratorCount>
            )}
          </Tag>
        </StickyBreadcrumbPath.Crumb>,

        <StickyBreadcrumbPath.Crumb key="tail">
          <ColoredChannelLink
            as={Link}
            to={channel.href}
            state={getBreadcrumbPath(channel.owner)}
            visibility={channel.visibility}
          >
            {
              {
                resting: (
                  <span dangerouslySetInnerHTML={{ __html: channel.title }} />
                ),
                stuck: (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: channel.truncatedTitle,
                    }}
                  />
                ),
              }[mode]
            }
          </ColoredChannelLink>
          {channel.visibility === 'private' && showBadge && (
            <BorderedLock ml={3} />
          )}
        </StickyBreadcrumbPath.Crumb>,

        /\/search$/.test(pathname) && (
          <StickyBreadcrumbPath.Crumb>{searchLabel}</StickyBreadcrumbPath.Crumb>
        ),
      ]}
      {}
    </StickyBreadcrumbPath>
  )
}
