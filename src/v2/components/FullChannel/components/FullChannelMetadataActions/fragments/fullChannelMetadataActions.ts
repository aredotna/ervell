import { gql } from '@apollo/client'

export default gql`
  fragment FullChannelMetadataActions on Channel {
    __typename
    id
    can {
      mute
    }
    shareable_href: href
    shareable_title: title(truncate: 40)
  }
`
