import gql from 'graphql-tag';

export default gql`
  mutation deleteGroupMutation($id: ID!){
    delete_group(input: { id: $id }) {
      status
    }
  }
`;
