import { gql } from '@apollo/client'

export default gql`
  mutation acceptInvitationMutation(
    $invitation_token: String!
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
    $receive_newsletter: Boolean
    $receive_tips_emails: Boolean
    $validation_token: String!
  ) {
    accept_invitation(
      input: {
        invitation_token: $invitation_token
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        password_confirmation: $password_confirmation
        receive_newsletter: $receive_newsletter
        receive_tips_emails: $receive_tips_emails
        validation_token: $validation_token
      }
    ) {
      me {
        id
        email
      }
    }
  }
`
