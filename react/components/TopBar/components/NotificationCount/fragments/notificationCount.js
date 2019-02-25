import gql from 'graphql-tag';

export default gql`
  fragment NotificationCount on Me {
    __typename
    id
    counts {
      __typename
      notifications
    }
  }
`;
