import { gql } from '@apollo/client'

export default gql`
  query NewsletterSettings {
    me {
      __typename
      id
      settings {
        receive_editorial_emails
      }
    }
  }
`
