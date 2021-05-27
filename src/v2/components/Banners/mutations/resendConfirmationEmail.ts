import { gql } from '@apollo/client'

export default gql`
  mutation ResendConfirmationEmail {
    resend_confirmation_email(input: {}) {
      me {
        __typename
        id
      }
    }
  }
`
