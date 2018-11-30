import gql from 'graphql-tag';

import billingFormCustomerFragment from 'react/components/Billing/components/BillingForm/fragments/billingFormCustomer';

export default gql`
  mutation ChangeDefaultCreditCard($default_credit_card_id: String!) {
    update_customer(input: { default_credit_card_id: $default_credit_card_id }) {
      customer {
        __typename
        id
        ...BillingFormCustomer
      }
    }
  }
  ${billingFormCustomerFragment}
`;
