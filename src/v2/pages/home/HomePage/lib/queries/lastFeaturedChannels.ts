import { gql } from '@apollo/client'

export default gql`
  query LastFeaturedChannels {
    channel(id: "featured-channels-c1f30sunbl4") {
      contents: blokks(
        per: 5
        sort_by: POSITION
        direction: DESC
        type: CHANNEL
      ) {
        ... on Channel {
          to_s
          id
        }
      }
    }
  }
`
