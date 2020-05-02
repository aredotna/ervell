import React, { Component } from 'react'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import channelBreadcrumbFragment from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb'

import ColoredChannelLink from 'v2/components/UI/ColoredChannelLink'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import BorderedLock from 'v2/components/UI/BorderedLock'

import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

const CollaboratorCount = styled.span`
  font-weight: normal;
`

export default class ChannelBreadcrumb extends Component {
  static propTypes = {
    channel: propType(channelBreadcrumbFragment).isRequired,
  }

  render() {
    const { channel } = this.props

    return (
      <StickyBreadcrumbPath>
        {({ mode }) => [
          <StickyBreadcrumbPath.Crumb key="head">
            <Link
              to={{
                pathname: channel.owner.href,
                state: getBreadcrumbPath(channel.owner),
              }}
            >
              {channel.owner.name}

              {channel.counts.collaborators > 0 && (
                <CollaboratorCount>
                  {' '}
                  (+{channel.counts.collaborators})
                </CollaboratorCount>
              )}
            </Link>
          </StickyBreadcrumbPath.Crumb>,

          <StickyBreadcrumbPath.Crumb key="tail">
            <ColoredChannelLink
              as={Link}
              to={{
                pathname: channel.href,
                state: getBreadcrumbPath(channel),
              }}
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
            {channel.visibility === 'private' && <BorderedLock ml={3} />}
          </StickyBreadcrumbPath.Crumb>,
        ]}
      </StickyBreadcrumbPath>
    )
  }
}
