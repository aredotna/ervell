import { gql } from '@apollo/client'

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel'

export default gql`
  fragment ProfileChannelIndex on Identifiable {
    ... on User {
      __typename
      id
      is_me
      name
      channels_index(type: $type) {
        key
        channels {
          ...CompactChannel
        }
      }
    }
    ... on Group {
      __typename
      id
      is_current_user_a_member
      name
      channels_index(type: $type) {
        key
        channels {
          ...CompactChannel
        }
      }
    }
  }
  ${compactChannelFragment}
`
