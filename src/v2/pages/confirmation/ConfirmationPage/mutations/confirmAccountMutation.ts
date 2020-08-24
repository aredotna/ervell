import gql from 'graphql-tag'

export default gql`
  mutation confirmAccountMutation($token: String!) {
    __typename
    confirm_account(input: { token: $token }) {
      status
      user {
        id
        href
      }
    }
  }
`
