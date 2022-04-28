import { gql } from '@apollo/client'

export default gql`
  mutation subscribeToNewsletter($email: String!, $list: NewsletterListEnum) {
    subscribe_to_newsletter(input: { email: $email, list: $list }) {
      status
    }
  }
`
