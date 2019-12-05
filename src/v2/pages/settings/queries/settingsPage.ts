import gql from 'graphql-tag'

export default gql`
  query SettingsPage {
    me {
      __typename
      id
      name
      groups(type: OWNER) {
        id
      }
    }
  }
`
