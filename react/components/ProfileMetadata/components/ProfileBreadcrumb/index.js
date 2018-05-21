import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import ProfileBadge from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge';

export default class ProfileBreadcrumb extends Component {
  static propTypes = {
    user: propType(profileBreadcrumbFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <StickyBreadcrumbPath>
        <StickyBreadcrumbPath.Crumb>
          <a href={user.href}>
            {user.name}
          </a>

          <ProfileBadge user={user} />
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}
