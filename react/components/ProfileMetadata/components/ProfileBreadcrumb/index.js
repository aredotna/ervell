import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';

import BreadcrumbPath from 'react/components/UI/BreadcrumbPath';
import ProfileBadge from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge';

export default class ProfileBreadcrumb extends Component {
  static propTypes = {
    user: propType(profileBreadcrumbFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <BreadcrumbPath>
        <BreadcrumbPath.Crumb>
          <a href={user.href}>
            {user.name}
          </a>

          <ProfileBadge user={user} />
        </BreadcrumbPath.Crumb>
      </BreadcrumbPath>
    );
  }
}
