import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import channelBreadcrumbFragment from 'react/components/ChannelMetadata/components/ChannelBreadcrumb/fragments/channelBreadcrumb';

import ColoredChannelLink from 'react/components/UI/ColoredChannelLink';
import BreadcrumbPath from 'react/components/BreadcrumbPath';

export default class ChannelBreadcrumb extends Component {
  static propTypes = {
    channel: propType(channelBreadcrumbFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <BreadcrumbPath>
        <BreadcrumbPath.Crumb>
          <a href={channel.owner.href}>
            {channel.owner.name}
          </a>
        </BreadcrumbPath.Crumb>

        <BreadcrumbPath.Crumb>
          <ColoredChannelLink
            title={channel.title}
            href={channel.href}
            visibility={channel.visibility}
          >
            {channel.title}
          </ColoredChannelLink>
        </BreadcrumbPath.Crumb>
      </BreadcrumbPath>
    );
  }
}
