import gql from 'graphql-tag';

import myCreditCardFragment from 'react/components/MyCreditCard/fragments/myCreditCard';

export default gql`
  mutation ChangeDefaultCreditCard($default_credit_card_id: String!) {
    update_customer(input: { default_credit_card_id: $default_credit_card_id }) {
      customer {
        __typename
        id
        ...MyCreditCard
      }
    }
  }
  ${myCreditCardFragment}
`;
