import gql from 'graphql-tag'

export default gql`
  mutation SendInvitation($emails: [String!]!) {
    invite_users(input: { emails: $emails }) {
      users {
        name
      }
    }
  }
`
