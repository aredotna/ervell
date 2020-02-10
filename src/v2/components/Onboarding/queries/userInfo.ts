import gql from 'graphql-tag'

export default gql`
  query OnboardingUserInfoQuery {
    me {
      __typename
      slug
    }
  }
`
