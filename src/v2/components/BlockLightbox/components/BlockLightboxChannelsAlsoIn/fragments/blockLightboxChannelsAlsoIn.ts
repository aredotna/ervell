import { gql } from '@apollo/client'

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel'

export default gql`
  fragment BlockLightboxChannelsAlsoIn on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      counts {
        channels_with_same_source
      }
      channels_with_same_source(per: 5) {
        ...CompactChannel
      }
    }
  }
  ${compactChannelFragment}
`
