import gql from 'graphql-tag';

export default gql`
  fragment UnreadNotificationsCount on Me {
    id
    counts {
      notifications
    }
  }
`;
