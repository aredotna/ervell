import { gql } from '@apollo/client'

import { embeddedChannelHeaderFragment } from '../../EmbeddedChannelHeader/fragments/embeddedChannelHeader'
import { embeddedChannelContentsFragment } from '../../EmbeddedChannelContents/fragments/embeddedChannelContents'
import { embeddedChannelCTAFragment } from '../../EmbeddedChannelCTA/fragments/embeddedChannelCTA'

export default gql`
  query EmbeddedChannel($id: ID!, $per: Int) {
    channel(id: $id) {
      ...EmbeddedChannelHeader
      ...EmbeddedChannelContents
      ...EmbeddedChannelCTA
    }
  }
  ${embeddedChannelHeaderFragment}
  ${embeddedChannelContentsFragment}
  ${embeddedChannelCTAFragment}
`
