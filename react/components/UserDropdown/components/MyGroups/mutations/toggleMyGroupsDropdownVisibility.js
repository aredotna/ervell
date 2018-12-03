import gql from 'graphql-tag';

import myGroupsFragment from 'react/components/UserDropdown/components/MyGroups/fragments/myGroups';

export default gql`
  mutation ToggleMyGroupsDropdownVisibility($flags: [MeFlagInput]!) {
    set_me_flags(input: { flags: $flags }) {
      me {
        ...MyGroups
      }
    }
  }
  ${myGroupsFragment}
`;
