import gql from 'graphql-tag';

import notificationCountFragment from 'react/components/TopBar/components/NotificationCount/fragments/notificationCount';

export default gql`
  mutation clearNotifications {
    clear_notifications(input: { confirm: true }) {
      me {
        __typename
        id
        ...NotificationCount
      }
    }
  }
  ${notificationCountFragment}
`;
