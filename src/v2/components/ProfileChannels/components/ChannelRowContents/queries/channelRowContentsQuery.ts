import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  query ChannelRowContents($id: ID!) {
    channel(id: $id) {
      __typename
      id
      blokks(page: 1, per: 5, sort_by: POSITION, direction: DESC) {
        __typename
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
`
