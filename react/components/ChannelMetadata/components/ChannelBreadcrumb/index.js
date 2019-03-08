import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import channelBreadcrumbFragment from 'react/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb';

import { truncate } from 'react/components/UI/Truncate';
import ColoredChannelLink from 'react/components/UI/ColoredChannelLink';
import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import LockIconWithBorder from 'react/components/UI/LockIconWithBorder';

const CollaboratorCount = styled.span`
  font-weight: normal;
`;

export default class ChannelBreadcrumb extends Component {
  static propTypes = {
    channel: propType(channelBreadcrumbFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <StickyBreadcrumbPath>
        {({ mode }) => [
          <StickyBreadcrumbPath.Crumb key="head">
            <a href={channel.owner.href}>
              {channel.owner.name}

              {channel.counts.collaborators > 0 &&
                <CollaboratorCount>
                  {' '}
                  (+{channel.counts.collaborators})
                </CollaboratorCount>
              }
            </a>
          </StickyBreadcrumbPath.Crumb>,

          <StickyBreadcrumbPath.Crumb key="tail">
            <ColoredChannelLink
              href={channel.href}
              visibility={channel.visibility}
            >
              {{
                resting: (<span dangerouslySetInnerHTML={{ __html: channel.title }} />),
                stuck: truncate(channel.title, 25),
              }[mode]}
            </ColoredChannelLink>
            {channel.visibility === 'private' &&
              <LockIconWithBorder ml={3} />
            }
          </StickyBreadcrumbPath.Crumb>,
        ]}
      </StickyBreadcrumbPath>
    );
  }
}
