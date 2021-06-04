import { gql } from '@apollo/client'

export default gql`
  mutation resetPassword(
    $token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    reset_password(
      input: {
        token: $token
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      me {
        email
      }
    }
  }
`
