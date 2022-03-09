import { gql } from '@apollo/client'

export default gql`
  fragment FullChannelMetadataActions on Channel {
    __typename
    id
    can {
      mute
      follow
    }
    shareable_href: href(absolute: true)
    shareable_title: title(truncate: 40)
  }
`
