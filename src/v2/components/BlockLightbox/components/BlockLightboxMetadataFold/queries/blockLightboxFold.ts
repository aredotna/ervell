import { gql } from '@apollo/client'

import blockLightboxConnectionsFragment from 'v2/components/BlockLightbox/components/BlockLightboxConnections/fragments/blockLightboxConnections'
import blockLightboxCommentsFragment from 'v2/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments'

export default gql`
  query BlockLightboxFold($id: ID!, $page: Int, $per: Int) {
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
      ...BlockLightboxConnections
      ...BlockLightboxComments
    }
  }
  ${blockLightboxConnectionsFragment}
  ${blockLightboxCommentsFragment}
`
