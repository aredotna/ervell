import { gql } from '@apollo/client'

export default gql`
  fragment TwitterAuthCheck on Me {
    id
    twitter_authentication: authenticated_service(provider: TWITTER) {
      __typename
      id
    }
  }
`
