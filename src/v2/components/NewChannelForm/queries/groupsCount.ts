import { gql } from '@apollo/client'

export default gql`
  query GroupsCountQuery {
    me {
      __typename
      id
      counts {
        groups
      }
    }
  }
`
