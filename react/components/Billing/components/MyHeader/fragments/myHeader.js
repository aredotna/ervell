import gql from 'graphql-tag';

import userAvatarFragment from 'react/components/UserAvatar/fragments/userAvatar';
import upcomingInvoiceFragment from 'react/components/Billing/components/UpcomingInvoice/fragments/upcomingInvoice';

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
`;
