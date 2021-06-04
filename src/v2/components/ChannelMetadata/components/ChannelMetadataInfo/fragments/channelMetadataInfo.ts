import { gql } from '@apollo/client'

export default gql`
  fragment ChannelMetadataInfo on Channel {
    __typename
    id
    href
    visibility
    info: description(format: HTML)
    counts {
      followers
    }
    can {
      share
    }
    user {
      __typename
      id
      href
      name
    }
  }
`
