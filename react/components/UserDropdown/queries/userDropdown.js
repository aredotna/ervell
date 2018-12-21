import gql from 'graphql-tag';

import myGroupsFragment from 'react/components/UserDropdown/components/MyGroups/fragments/myGroups';

export default gql`
  query UserDropdown {
    me {
      id
      name
      href
      is_premium
      is_confirmed
      ... MyGroups
    }
  }
  ${myGroupsFragment}
`;
