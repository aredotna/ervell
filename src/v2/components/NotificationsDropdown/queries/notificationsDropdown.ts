import { gql } from '@apollo/client'

import notificationSentenceFragment from 'v2/components/NotificationsDropdown/components/Notification/fragments/notificationSentence'
import unreadNotificationsCountFragment from 'v2/components/NotificationsDropdown/fragments/unreadNotificationsCount'

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
`
