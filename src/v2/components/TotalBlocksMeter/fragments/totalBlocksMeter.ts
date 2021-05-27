import { gql } from '@apollo/client'

export default gql`
  fragment TotalBlocksMeter on Me {
    __typename
    id
    counts {
      __typename
      connections
    }
    non_premium_connections_limit
  }
`
