import { gql } from '@apollo/client'
import { tableRowFragment } from 'v2/components/Table/fragments/tableRow'

export default gql`
  query ConnectableTableBlokk($id: ID!, $includeConnection: Boolean!) {
    blokk(id: $id) {
      __typename
      ...TableRowFragment
    }
  }
  ${tableRowFragment}
`
