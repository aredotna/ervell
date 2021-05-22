import { gql } from '@apollo/client'

export default gql`
  fragment UnreadNotificationsCount on Me {
    id
    counts {
      notifications
    }
  }
`
