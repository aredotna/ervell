import { gql } from '@apollo/client'

export default gql`
  mutation rejectChannelTransferMutation($token: String!) {
    reject_channel_transfer(input: { token: $token }) {
      channel {
        id
        title
        href
      }
    }
  }
`
