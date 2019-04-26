import gql from 'graphql-tag'

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
