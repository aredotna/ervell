import { gql } from '@apollo/client'

import fullBlockLinkFragment from 'v2/components/FullBlock/components/FullBlockLink/fragments/fullBlockLink'

export default gql`
  query FullBlockLinkQuery($id: ID!) {
    block: blokk(id: $id) {
      ...FullBlockLink
    }
  }
  ${fullBlockLinkFragment}
`
