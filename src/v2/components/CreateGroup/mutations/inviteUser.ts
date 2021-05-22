import { gql } from '@apollo/client'

export default gql`
  mutation inviteUserMutation($email: String!) {
    invite_users(input: { emails: [$email] }) {
      users {
        id
        name
      }
    }
  }
`
