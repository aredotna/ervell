import React, { Component } from 'react'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import channelBreadcrumbFragment from 'v2/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb'

import ColoredChannelLink from 'v2/components/UI/ColoredChannelLink'
import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath'
import BorderedLock from 'v2/components/UI/BorderedLock'

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
            <a href={channel.owner.href}>
              {channel.owner.name}

              {channel.counts.collaborators > 0 && (
                <CollaboratorCount>
                  {' '}
                  (+{channel.counts.collaborators})
                </CollaboratorCount>
              )}
            </a>
          </StickyBreadcrumbPath.Crumb>,

          <StickyBreadcrumbPath.Crumb key="tail">
            <ColoredChannelLink
              href={channel.href}
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
