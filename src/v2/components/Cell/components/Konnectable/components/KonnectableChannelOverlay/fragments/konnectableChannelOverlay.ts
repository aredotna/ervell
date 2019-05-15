import gql from 'graphql-tag'

export default gql`
  fragment KonnectableChannelOverlay on Channel {
    id
    visibility
    counts {
      __typename
      contents
    }
  }
`
