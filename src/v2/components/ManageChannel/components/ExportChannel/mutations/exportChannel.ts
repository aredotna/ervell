import gql from 'graphql-tag';

export default gql`
  mutation exportChannelMutation($id: ID!, $format: ExportFormats!) {
    export_channel(input: { id: $id, format: $format }) {
      clientMutationId
      status
    }
  }
`;
