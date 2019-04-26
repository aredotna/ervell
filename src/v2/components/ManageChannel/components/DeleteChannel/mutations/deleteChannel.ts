import gql from 'graphql-tag'

export default gql`
  mutation deleteChannelMutation($id: ID!) {
    delete_channel(input: { id: $id }) {
      clientMutationId
      status
    }
  }
`
