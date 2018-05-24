import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import ProfileBadge from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge';
import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

class ProfileBreadcrumb extends Component {
  static propTypes = {
    user: propType(profileBreadcrumbFragment).isRequired,
    currentRoute: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { user, currentRoute: { pathname } } = this.props;

    return (
      <StickyBreadcrumbPath>
        <StickyBreadcrumbPath.Crumb>
          <a href={user.href}>
            {user.name}
          </a>

          {!/follow(ers|ing)$/.test(pathname) &&
            <ProfileBadge user={user} />
          }
        </StickyBreadcrumbPath.Crumb>

        {/following$/.test(pathname) &&
          <StickyBreadcrumbPath.Crumb>
            Following
          </StickyBreadcrumbPath.Crumb>
        }

        {/followers$/.test(pathname) &&
          <StickyBreadcrumbPath.Crumb>
            Followers
          </StickyBreadcrumbPath.Crumb>
        }
      </StickyBreadcrumbPath>
    );
  }
}

export default WithCurrentRoute(ProfileBreadcrumb);
