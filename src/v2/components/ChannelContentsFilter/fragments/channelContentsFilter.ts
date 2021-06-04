import { gql } from '@apollo/client'

export const channelContentsFilterFragment = gql`
  fragment ChannelContentsFilter on Channel {
    __typename
    id
    title
    counts {
      contents
      blocks
      channels
    }
  }
`
