import { gql } from '@apollo/client'

import myGroupLinkFragment from 'v2/components/UserDropdown/components/MyGroupLinks/components/MyGroupLink/fragments/myGroupLink'

export default gql`
  fragment MyGroupLinks on Me {
    __typename
    id
    is_my_groups_dropdown_hidden: flag(name: "is_my_groups_dropdown_hidden")
    groups(page: 1, per: 50) {
      ...MyGroupLink
    }
  }
  ${myGroupLinkFragment}
`
