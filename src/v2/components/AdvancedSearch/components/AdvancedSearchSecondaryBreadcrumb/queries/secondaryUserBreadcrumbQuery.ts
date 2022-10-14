import { gql } from '@apollo/client'

export default gql`
  query SecondaryUserBreadcrumbQuery($user_id: ID!) {
    user(id: $user_id) {
      id
      name
      slug
      href
    }
  }
`
