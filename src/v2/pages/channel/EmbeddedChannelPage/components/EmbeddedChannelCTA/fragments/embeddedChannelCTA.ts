import { gql } from '@apollo/client'

export const embeddedChannelCTAFragment = gql`
  fragment EmbeddedChannelCTA on Channel {
    __typename
    id
    href(absolute: true)
  }
`
