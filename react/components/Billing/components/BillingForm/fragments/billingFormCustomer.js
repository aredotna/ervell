import gql from 'graphql-tag';

import myCreditCardFragment from 'react/components/Billing/components/MyCreditCard/fragments/myCreditCard';
import cancellationNoticeFragment from 'react/components/Billing/components/CancellationNotice/fragments/cancellationNotice';

export default gql`
  fragment BillingFormCustomer on Customer {
    __typename
    id
    updated_at
    is_lifetime
    plan {
      __typename
      id
    }
    default_credit_card {
      __typename
      id
    }
    ...MyCreditCard
    ...CancellationNotice
  }
  ${myCreditCardFragment}
  ${cancellationNoticeFragment}
`;
