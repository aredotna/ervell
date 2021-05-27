import { gql } from '@apollo/client'

export default gql`
  mutation createAddBlockMutation($channel_id: ID!, $value: String) {
    create_block(input: { channel_ids: [$channel_id], value: $value }) {
      block: blokk {
        __typename
        ... on Model {
          id
        }
      }
    }
  }
`
