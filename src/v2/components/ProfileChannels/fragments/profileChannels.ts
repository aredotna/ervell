import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'
import konnectableChannelFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel/fragments/konnectableChannel'

export default gql`
  fragment ProfileChannels on Identifiable {
    ... on Group {
      __typename
      id
      name
      channels(page: $page, per: $per) {
        ...KonnectableChannel
        blokks(per: 5, direction: DESC) {
          ...KonnectableCell
        }
      }
      counts {
        channels
      }
    }
    ... on User {
      __typename
      id
      name
      counts {
        channels
      }
      channels(page: $page, per: $per, sort_by: $sort) {
        ...KonnectableChannel

        blokks(per: 5, sort_by: POSITION, direction: DESC) {
          ...KonnectableCell
        }
      }
    }
  }
  ${konnectableCellFragment}
  ${konnectableChannelFragment}
`
