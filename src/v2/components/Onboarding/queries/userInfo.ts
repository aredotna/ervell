import { gql } from '@apollo/client'

export default gql`
  query OnboardingUserInfoQuery {
    me {
      __typename
      slug
    }
  }
`
