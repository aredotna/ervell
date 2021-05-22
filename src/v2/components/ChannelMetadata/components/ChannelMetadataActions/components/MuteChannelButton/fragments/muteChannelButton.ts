import { gql } from '@apollo/client'

export default gql`
  fragment MuteChannelButton on Channel {
    __typename
    id
    is_muted
  }
`
