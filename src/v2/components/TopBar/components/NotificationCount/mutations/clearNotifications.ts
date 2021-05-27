import { gql } from '@apollo/client'

import notificationCountFragment from 'v2/components/TopBar/components/NotificationCount/fragments/notificationCount'

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
`
