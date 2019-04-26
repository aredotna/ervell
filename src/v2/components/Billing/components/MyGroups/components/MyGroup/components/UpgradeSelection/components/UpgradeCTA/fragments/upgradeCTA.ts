import gql from 'graphql-tag'

export default gql`
  fragment UpgradeCTA on Group {
    __typename
    id
    subscription {
      __typename
      id
      plan {
        __typename
        id
        term
      }
      users(status: ACTIVE) {
        __typename
        id
        name
      }
    }
    users {
      __typename
      id
      is_premium
    }
  }
`
