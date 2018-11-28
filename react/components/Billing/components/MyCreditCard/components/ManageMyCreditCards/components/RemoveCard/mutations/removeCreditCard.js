import gql from 'graphql-tag';

import myCreditCardFragment from 'react/components/Billing/components/MyCreditCard/fragments/myCreditCard';

export default gql`
  mutation RemoveCreditCard($id: String!) {
    remove_credit_card(input: { id: $id }) {
      customer {
        ...MyCreditCard
      }
    }
  }
  ${myCreditCardFragment}
`;
