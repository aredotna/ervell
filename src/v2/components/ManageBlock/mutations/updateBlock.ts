import { gql } from '@apollo/client'

import blockLightboxFragment from 'v2/components/BlockLightbox/fragments/blockLightbox'

export default gql`
  mutation updateBlockMutation(
    $id: ID!
    $title: String
    $description: String
    $content: String
  ) {
    update_block(
      input: {
        id: $id
        title: $title
        description: $description
        content: $content
      }
    ) {
      block: blokk {
        ...BlockLightbox
      }
    }
  }
  ${blockLightboxFragment}
`
