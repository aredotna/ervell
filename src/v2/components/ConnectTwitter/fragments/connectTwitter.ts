import { gql } from '@apollo/client'

import contactFragment from 'v2/components/ConnectTwitter/components/Contact/fragments/contact'

export default gql`
  fragment ConnectTwitter on Me {
    id
    __typename
    authenticated_service {
      __typename
      id
      contacts(per: $per, page: $page) {
        ...Contact
      }
    }
  }
  ${contactFragment}
`
