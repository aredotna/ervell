import { gql } from '@apollo/client'

export default gql`
  mutation createChannelMutation(
    $title: String!
    $description: String
    $visibility: ChannelVisibility
    $group_id: ID
  ) {
    create_channel(
      input: {
        title: $title
        description: $description
        visibility: $visibility
        group_id: $group_id
      }
    ) {
      channel {
        __typename
        id
        href
      }
    }
  }
`
