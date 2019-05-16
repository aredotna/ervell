import gql from 'graphql-tag'

import { embeddedChannelHeaderFragment } from '../components/EmbeddedChannelHeader/fragments/embeddedChannelHeader'
import { embeddedChannelContentsFragment } from '../components/EmbeddedChannelContents/fragments/embeddedChannelContents'
import { embeddedChannelCTAFragment } from '../components/EmbeddedChannelCTA/fragments/embeddedChannelCTA'

export default gql`
  query EmbeddedChannelPage($id: ID!) {
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
