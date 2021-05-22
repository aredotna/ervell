import { gql } from '@apollo/client'

export default gql`
  mutation createUserMessageChannelMutation($id: ID!) {
    create_user_message_channel(input: { id: $id }) {
      channel {
        href
      }
    }
  }
`
