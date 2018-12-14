import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { withRouter } from 'react-router-dom';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import ProfileBadge from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge';
import Badge from 'react/components/UI/Badge';

class ProfileBreadcrumb extends Component {
  static propTypes = {
    identifiable: propType(profileBreadcrumbFragment).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { identifiable, location: { pathname } } = this.props;

    const showBadge = (!/follow(ers|ing)$/.test(pathname) && !/groups$/.test(pathname));

    return (
      <StickyBreadcrumbPath>
        <StickyBreadcrumbPath.Crumb>
          <a href={identifiable.href}>
            {identifiable.name}
          </a>

          {(showBadge && identifiable.__typename === 'Group') &&
            <Badge f={0} ml={4} color="gray.medium" icon={{ private: 'Lock' }[identifiable.visibility]}>
              Groups
            </Badge>
          }

          {(showBadge && identifiable.__typename === 'User') &&
            <ProfileBadge user={identifiable} />
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

        {/groups$/.test(pathname) &&
          <StickyBreadcrumbPath.Crumb>
            Groups
          </StickyBreadcrumbPath.Crumb>
        }
      </StickyBreadcrumbPath>
    );
  }
}

export default withRouter(ProfileBreadcrumb);
