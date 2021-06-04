import { gql } from '@apollo/client'

export default gql`
  fragment ChannelShareButton on Channel {
    __typename
    id
    visibility
    share {
      url
      twitter_url
      facebook_url
    }
  }
`
