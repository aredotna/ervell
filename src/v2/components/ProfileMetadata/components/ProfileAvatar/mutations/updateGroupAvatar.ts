import { gql } from '@apollo/client'

export default gql`
  mutation updateGroupAvatar($id: ID!, $avatar_url: String!) {
    update_group(input: { id: $id, avatar_url: $avatar_url }) {
      group {
        __typename
        id
        avatar(size: LARGE)
      }
    }
  }
`
