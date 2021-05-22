import { gql } from '@apollo/client'

export default gql`
  mutation registerMutation(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
    $receive_newsletter: Boolean
    $validation_token: String!
  ) {
    registration(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        password_confirmation: $password_confirmation
        receive_newsletter: $receive_newsletter
        validation_token: $validation_token
      }
    ) {
      me {
        id
      }
    }
  }
`
