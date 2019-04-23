import gql from 'graphql-tag';

export default gql`
  mutation createGroupMutation($name: String!, $description: String) {
    create_group(input: { name: $name, description: $description }) {
      group {
        id
        href
      }
    }
  }
`;
