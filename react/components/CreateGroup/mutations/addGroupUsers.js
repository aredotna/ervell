import gql from 'graphql-tag';

export default gql`
  mutation addGroupUsersMutation($user_ids: [ID]!, $id: ID!){
    add_group_users(input: { user_ids: $user_ids, id: $id }) {
      group {
        id
        users {
          id
        }
      }
    }
  }
`;
