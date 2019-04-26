import gql from 'graphql-tag'

export default gql`
  fragment EmptyOrTips on Identifiable {
    ... on User {
      __typename
      id
      is_me
    }

    ... on Group {
      __typename
      id
      is_current_user_a_member
    }
  }
`
