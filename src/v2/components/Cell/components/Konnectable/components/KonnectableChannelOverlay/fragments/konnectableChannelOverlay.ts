import { gql } from '@apollo/client'

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
