import { gql } from '@apollo/client'

import fullBlockConnectionsFragment from 'v2/components/FullBlock/components/FullBlockConnections/fragments/fullBlockConnections'

export default gql`
  query FullBlockConnectionsQuery($id: ID!, $page: Int, $per: Int) {
    block: blokk(id: $id) {
      ...FullBlockConnections
    }
  }
  ${fullBlockConnectionsFragment}
`
