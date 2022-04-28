import { gql } from '@apollo/client'

export default gql`
  mutation UpdateNewsletterSettingsMutation(
    $receive_editorial_emails: Boolean
  ) {
    update_account(
      input: { receive_editorial_emails: $receive_editorial_emails }
    ) {
      me {
        id
        settings {
          receive_editorial_emails
        }
      }
    }
  }
`
