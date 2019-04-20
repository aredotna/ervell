import gql from 'graphql-tag';

import planSelectionFragment from 'react/components/Billing/components/PlanSelection/fragments/planSelection';
import billingFormCustomerFragment from 'react/components/Billing/components/BillingForm/fragments/billingFormCustomer';

export default gql`
  fragment BillingForm on Me {
    __typename
    id
    ...PlanSelection
    customer {
      ...BillingFormCustomer
    }
  }
  ${planSelectionFragment}
  ${billingFormCustomerFragment}
`;
