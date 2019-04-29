import gql from 'graphql-tag'

export default gql`
  mutation requestPasswordReset($email: String!) {
    request_password_reset(input: { email: $email }) {
      email
    }
  }
`
