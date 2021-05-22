import { gql } from '@apollo/client'

export default gql`
  mutation deleteChannelMutation($id: ID!) {
    delete_channel(input: { id: $id }) {
      clientMutationId
      status
    }
  }
`
