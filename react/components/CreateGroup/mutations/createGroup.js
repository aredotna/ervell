import gql from 'graphql-tag';

export default gql`
  mutation createGroupMutation($name: String!) {
    create_group(input: { name: $name }) {
      group {
        id
      }
    }
  }
`;
