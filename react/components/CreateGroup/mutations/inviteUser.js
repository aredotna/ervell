import gql from 'graphql-tag';

export default gql`
  mutation inviteUserMutation($email: String!){
    invite_users(input: { emails: [$email] }) {
      users {
        id
        name
      }
    }
  }
`;
