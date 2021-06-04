import { gql } from '@apollo/client'

export default gql`
  mutation exportChannelMutation($id: ID!, $format: ExportFormats!) {
    export_channel(input: { id: $id, format: $format }) {
      clientMutationId
      status
    }
  }
`
