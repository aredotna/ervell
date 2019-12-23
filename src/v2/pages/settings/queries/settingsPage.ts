import gql from 'graphql-tag'

export default gql`
  query SettingsPage {
    me {
      __typename
      id
      name
      is_premium
      groups(type: OWNER) {
        id
      }
    }
  }
`
