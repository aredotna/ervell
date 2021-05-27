import { gql } from '@apollo/client'

import blockLightboxContentPaneFragment from 'v2/components/BlockLightbox/components/BlockLightboxContentPane/fragments/blockLightboxContentPane'

export default gql`
  query BlockContent($block_id: ID!) {
    blokk(id: $block_id) {
      __typename
      ... on Model {
        id
      }
      ... on ConnectableInterface {
        title
      }
      ...BlockLightboxContentPane
    }
  }
  ${blockLightboxContentPaneFragment}
`
