import { gql } from '@apollo/client'

const canUserConnectQuery = gql`
  query CanUserConnect {
    me {
      is_exceeding_either_connections_limit
    }
  }
`

export default canUserConnectQuery
