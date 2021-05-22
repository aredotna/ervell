import { gql } from '@apollo/client'

import userAvatarFragment from 'v2/components/UserAvatar/fragments/userAvatar'
import upcomingInvoiceFragment from 'v2/components/Billing/components/UpcomingInvoice/fragments/upcomingInvoice'

export default gql`
  fragment MyHeader on Me {
    __typename
    id
    name
    ...UserAvatar
    customer {
      ...UpcomingInvoice
    }
  }
  ${userAvatarFragment}
  ${upcomingInvoiceFragment}
`
