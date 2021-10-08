import { gql } from '@apollo/client'

import fullBlockFragment from 'v2/components/FullBlock/fragments/fullBlock'

export default gql`
  mutation updateBlockCellMutation(
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
        ...FullBlock
      }
    }
  }
  ${fullBlockFragment}
`
