import gql from 'graphql-tag';

import profileBadgeFragment from 'react/components/ProfileMetadata/components/ProfileBreadcrumb/components/ProfileBadge/fragments/profileBadge';

export default gql`
  fragment ProfileBreadcrumb on Identifiable {
    __typename

    ... on User {
      name
      href
      ...ProfileBadge
    }

    ... on Group {
      name
      href
      visibility
    }
  }

  ${profileBadgeFragment}
`;
