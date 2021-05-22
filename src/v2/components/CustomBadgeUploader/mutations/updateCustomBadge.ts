import { gql } from '@apollo/client'

export default gql`
  mutation updateCustomBadge($custom_badge_url: String!) {
    update_account(input: { custom_badge_url: $custom_badge_url }) {
      me {
        __typename
        id
        custom_badge(size: LARGE)
      }
    }
  }
`
