import React from 'react';
import { propType } from 'graphql-anywhere';

import Badge from 'react/components/UI/Badge';

import profileBreadcrumbFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/fragments/profileBreadcrumb';


const GroupBadge = ({ group }) => (
  <Badge
    ml={6}
    icon={group.visibility === 'private' ? 'Lock' : undefined}
  >
    Group
  </Badge>

);

GroupBadge.propTypes = {
  group: propType(profileBreadcrumbFragment).isRequired,
};

export default GroupBadge;
