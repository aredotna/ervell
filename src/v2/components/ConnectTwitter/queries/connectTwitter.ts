import { gql } from '@apollo/client'

import connectTwitterFragment from 'v2/components/ConnectTwitter/fragments/connectTwitter'

export default gql`
  query ConnectTwitterQuery($per: Int, $page: Int) {
    me {
      __typename
      ...ConnectTwitter
    }
  }
  ${connectTwitterFragment}
`
