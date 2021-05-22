import { gql } from '@apollo/client'

import myGroupLinksFragment from 'v2/components/UserDropdown/components/MyGroupLinks/fragments/myGroupLinks'

export default gql`
  mutation ToggleMyGroupsDropdownVisibility($flags: [MeFlagInput]!) {
    set_me_flags(input: { flags: $flags }) {
      me {
        ...MyGroupLinks
      }
    }
  }
  ${myGroupLinksFragment}
`
