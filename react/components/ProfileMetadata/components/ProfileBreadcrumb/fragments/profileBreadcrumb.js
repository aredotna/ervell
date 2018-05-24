import gql from 'graphql-tag';

import profileBadgeFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge/fragments/profileBadge';

export default gql`
  fragment ProfileBreadcrumb on User {
    name
    href

    ...ProfileBadge
  }

  ${profileBadgeFragment}
`;
