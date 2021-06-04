import { gql } from '@apollo/client'

export default gql`
  mutation ResendLoggedOutConfirmationEmailMutation($email: String!) {
    resend_logged_out_confirmation_email(input: { email: $email }) {
      status
    }
  }
`
