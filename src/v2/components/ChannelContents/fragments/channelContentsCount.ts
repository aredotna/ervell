import { gql } from '@apollo/client'

export default gql`
  fragment ChannelContentsCount on Channel {
    id
    counts {
      contents
    }
  }
`
