import gql from 'graphql-tag';

import myCreditCardFragment from 'react/components/Billing/components/MyCreditCard/fragments/myCreditCard';

export default gql`
  mutation AddCreditCard($token: String!) {
    add_credit_card(input: { token: $token, default_source: true }) {
      customer {
        ...MyCreditCard
      }
    }
  }
  ${myCreditCardFragment}
`;
