import { gql } from '@apollo/client'

import fullBlockContentPaneFragment from 'v2/components/FullBlock/components/FullBlockContentPane/fragments/fullBlockContentPane'

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
      ...FullBlockContentPane
    }
  }
  ${fullBlockContentPaneFragment}
`
