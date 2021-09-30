import { gql } from '@apollo/client'
import { embeddedChannelContentsFragment } from 'v2/pages/channel/EmbeddedChannelPage/components/EmbeddedChannelContents/fragments/embeddedChannelContents'

export default gql`
  query ExpandedChannelRowContents($id: ID!, $per: Int) {
    channel(id: $id) {
      ...EmbeddedChannelContents
    }
  }
  ${embeddedChannelContentsFragment}
`
