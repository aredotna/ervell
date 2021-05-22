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
      groups(type: OWNER) {
        id
      }
    }
  }
`
