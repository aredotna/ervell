import { gql } from '@apollo/client'

export default gql`
  query SettingsPage {
    me {
      __typename
      id
      name
      is_premium
      is_supporter
      is_investor
      has_had_recent_birthday
      groups(type: OWNER) {
        id
      }
    }
  }
`
