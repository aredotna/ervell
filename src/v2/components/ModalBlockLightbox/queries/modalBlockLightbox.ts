import { gql } from '@apollo/client'

import blockLightboxFragment from 'v2/components/BlockLightbox/fragments/blockLightbox'

export default gql`
  query ModalBlockLightbox($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ...BlockLightbox
    }
  }
  ${blockLightboxFragment}
`
