import { gql } from '@apollo/client'

export default gql`
  mutation requestPasswordReset($email: String!) {
    request_password_reset(input: { email: $email }) {
      email
    }
  }
`
