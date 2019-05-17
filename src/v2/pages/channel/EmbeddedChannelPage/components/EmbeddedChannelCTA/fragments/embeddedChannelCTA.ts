import gql from 'graphql-tag'

export const embeddedChannelCTAFragment = gql`
  fragment EmbeddedChannelCTA on Channel {
    __typename
    id
    href(absolute: true)
  }
`
