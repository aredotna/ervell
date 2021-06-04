import { gql } from '@apollo/client'

export default gql`
  mutation SendInvitation($emails: [String!]!) {
    invite_users(input: { emails: $emails }) {
      users {
        name
      }
    }
  }
`
