import gql from 'graphql-tag'

export default gql`
  fragment PrivateBlocksMeter on Me {
    __typename
    id
    counts {
      __typename
      private_connections
    }
    non_premium_private_connections_limit
  }
`
