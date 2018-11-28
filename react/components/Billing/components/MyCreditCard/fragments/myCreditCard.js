import gql from 'graphql-tag';

import myCreditCardsFragment from 'react/components/Billing/components/MyCreditCard/components/ManageMyCreditCards/fragments/myCreditCards';

export default gql`
  fragment MyCreditCard on Customer {
    __typename
    id
    plan {
      id
      amount
      term
    }
    subscription {
      __typename
      id
      is_canceled
      current_period_end_at(format: "%D")
    }
    default_credit_card {
      __typename
      id
      brand
      last4
      exp_year
      exp_month
    }
    credit_cards {
      __typename
      id
    }
    upcoming_invoice {
      __typename
      subtotal
      total
      next_payment_attempt_at(format: "%D")
    }
    ...MyCreditCards
  }
  ${myCreditCardsFragment}
`;
