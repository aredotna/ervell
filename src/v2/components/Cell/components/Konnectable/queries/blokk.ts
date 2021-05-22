import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  query Blokk($id: ID!) {
    blokk(id: $id) {
      ...KonnectableCell
    }
  }
  ${konnectableCellFragment}
`
