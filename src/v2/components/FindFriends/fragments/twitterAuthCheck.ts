import gql from 'graphql-tag'

export default gql`
  fragment TwitterAuthCheck on Me {
    id
    twitter_authentication: authenticated_service(provider: TWITTER) {
      __typename
      id
    }
  }
`
