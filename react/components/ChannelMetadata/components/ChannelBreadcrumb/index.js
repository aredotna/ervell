import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import channelBreadcrumbFragment from 'react/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb';

import ColoredChannelLink from 'react/components/UI/ColoredChannelLink';
import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';

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
        <StickyBreadcrumbPath.Crumb>
          <a href={channel.owner.href}>
            {channel.owner.name}

            {channel.counts.collaborators > 0 &&
              <CollaboratorCount>
                {' '}
                (+{channel.counts.collaborators})
              </CollaboratorCount>
            }
          </a>
        </StickyBreadcrumbPath.Crumb>

        <StickyBreadcrumbPath.Crumb>
          <ColoredChannelLink
            title={channel.title}
            href={channel.href}
            visibility={channel.visibility}
          >
            {channel.title}
          </ColoredChannelLink>
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}
