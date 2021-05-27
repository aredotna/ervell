import { gql } from '@apollo/client'

import bottomBannerFragment from 'v2/components/BottomBanner/fragments/bottomBanner'
import notificationCountFragment from 'v2/components/TopBar/components/NotificationCount/fragments/notificationCount'

export default gql`
  query GlobalNavElements {
    me {
      __typename
      id
      ...BottomBanner
      ...NotificationCount
    }
  }
  ${bottomBannerFragment}
  ${notificationCountFragment}
`
