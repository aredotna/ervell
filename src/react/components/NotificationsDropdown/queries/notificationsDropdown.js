import gql from 'graphql-tag';

import notificationSentenceFragment from 'react/components/NotificationsDropdown/components/Notification/fragments/notificationSentence';
import unreadNotificationsCountFragment from 'react/components/NotificationsDropdown/fragments/unreadNotificationsCount';

export default gql`
  query NotificationsQuery($offset: Int, $limit: Int) {
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit, type: "Notification") {
        __typename
        notifications: deeds {
          ...NotificationSentence
        }
      }
      ...UnreadNotificationsCount
    }
  }
  ${notificationSentenceFragment}
  ${unreadNotificationsCountFragment}
`;
