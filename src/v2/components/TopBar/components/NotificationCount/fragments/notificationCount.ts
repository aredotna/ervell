import { gql } from '@apollo/client'

export default gql`
  fragment NotificationCount on Me {
    __typename
    id
    counts {
      __typename
      notifications
    }
  }
`
