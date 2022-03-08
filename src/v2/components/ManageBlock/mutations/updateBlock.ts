import { gql } from '@apollo/client'

import fullBlockFragment from 'v2/components/FullBlock/fragments/fullBlock'

export default gql`
  mutation updateBlockMutation(
    $id: ID!
    $title: String
    $description: String
    $content: String
    $alt_text: String
  ) {
    update_block(
      input: {
        id: $id
        title: $title
        description: $description
        content: $content
        alt_text: $alt_text
      }
    ) {
      block: blokk {
        ...FullBlock
      }
    }
  }
  ${fullBlockFragment}
`
