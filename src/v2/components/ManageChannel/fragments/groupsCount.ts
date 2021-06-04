import { gql } from '@apollo/client'

export default gql`
  fragment GroupsCount on Me {
    __typename
    id
    counts {
      groups
    }
  }
`
