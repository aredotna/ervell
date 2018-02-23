import gql from 'graphql-tag';

export default gql`
  mutation addGroupUsersMutation($user_ids: [ID]!, $group_id: ID!){
    add_group_users(input: { user_ids: $user_ids, group_id: $group_id }) {
      group {
        id
        users {
          id
        }
      }
    }
  }
`;
