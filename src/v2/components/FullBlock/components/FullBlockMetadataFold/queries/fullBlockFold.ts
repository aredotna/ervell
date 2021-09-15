import { gql } from '@apollo/client'

import fullBlockConnectionsFragment from 'v2/components/FullBlock/components/FullBlockConnections/fragments/fullBlockConnections'
import fullBlockCommentsFragment from 'v2/components/FullBlock/components/FullBlockComments/fragments/fullBlockComments'

export default gql`
  query FullBlockFold($id: ID!, $page: Int, $per: Int) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ... on Block {
        counts {
          __typename
          public_channels
          private_channels: private_accessible_channels
          comments
        }
      }
      ...FullBlockConnections
      ...FullBlockComments
    }
  }
  ${fullBlockConnectionsFragment}
  ${fullBlockCommentsFragment}
`
