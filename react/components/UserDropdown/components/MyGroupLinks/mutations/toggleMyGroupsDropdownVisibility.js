import gql from 'graphql-tag';

import myGroupLinksFragment from 'react/components/UserDropdown/components/MyGroupLinks/fragments/myGroupLinks';

export default gql`
  mutation ToggleMyGroupsDropdownVisibility($flags: [MeFlagInput]!) {
    set_me_flags(input: { flags: $flags }) {
      me {
        ...MyGroupLinks
      }
    }
  }
  ${myGroupLinksFragment}
`;
