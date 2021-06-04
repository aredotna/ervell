import { gql } from '@apollo/client'

export default gql`
  mutation addGroupUsersMutation($user_ids: [ID]!, $id: ID!) {
    add_group_users(input: { user_ids: $user_ids, id: $id }) {
      group {
        id
        users {
          id
        }
      }
    }
  }
`
