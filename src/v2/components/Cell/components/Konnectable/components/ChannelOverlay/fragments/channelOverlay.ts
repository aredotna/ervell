import gql from 'graphql-tag'

export default gql`
  fragment ChannelOverlay on Channel {
    id
    visibility
    counts {
      __typename
      contents
    }
  }
`
