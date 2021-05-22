import { gql } from '@apollo/client'

export default gql`
  mutation updateAvatar($avatar_url: String!) {
    update_account(input: { avatar_url: $avatar_url }) {
      me {
        __typename
        id
        avatar(size: LARGE)
      }
    }
  }
`
