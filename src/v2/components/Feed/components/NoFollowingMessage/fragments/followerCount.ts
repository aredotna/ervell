import { gql } from '@apollo/client'

export default gql`
  fragment FollowerCountCheck on Me {
    id
    counts {
      following
    }
    twitter_authentication: authenticated_service(provider: TWITTER) {
      __typename
      id
    }
  }
`
