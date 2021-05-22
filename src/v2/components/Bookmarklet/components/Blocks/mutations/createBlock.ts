import { gql } from '@apollo/client'

export default gql`
  mutation createBlockMutation(
    $channel_ids: [ID]!
    $value: String
    $original_source_url: String
    $original_source_title: String
    $title: String
    $description: String
  ) {
    create_block(
      input: {
        channel_ids: $channel_ids
        value: $value
        original_source_url: $original_source_url
        original_source_title: $original_source_title
        title: $title
        description: $description
      }
    ) {
      block: blokk {
        __typename
        ... on Model {
          id
        }
      }
    }
  }
`
