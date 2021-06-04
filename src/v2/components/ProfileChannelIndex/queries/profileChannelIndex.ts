import { gql } from '@apollo/client'

import profileChannelIndexFragment from 'v2/components/ProfileChannelIndex/fragments/profileChannelIndex'

export default gql`
  query ProfileChannelIndex($id: ID!, $type: IndexedChannelsTypes) {
    identity(id: $id) {
      identifiable {
        __typename
        ...ProfileChannelIndex
      }
    }
  }
  ${profileChannelIndexFragment}
`
