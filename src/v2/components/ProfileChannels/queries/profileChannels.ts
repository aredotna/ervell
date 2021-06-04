import { gql } from '@apollo/client'

import profileChannelsFragment from 'v2/components/ProfileChannels/fragments/profileChannels'

export default gql`
  query ProfileChannels($id: ID!, $page: Int, $per: Int, $sort: ChannelsSort) {
    identity(id: $id) {
      identifiable {
        __typename
        ...ProfileChannels
      }
    }
  }
  ${profileChannelsFragment}
`
