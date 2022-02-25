import { gql } from '@apollo/client'

import { tableRowFragment } from '../fragments/tableRow'

export default gql`
  query TableRow($id: ID!, $includeConnection: Boolean!) {
    blokk(id: $id) {
      ...TableRowFragment
    }
  }
  ${tableRowFragment}
`
