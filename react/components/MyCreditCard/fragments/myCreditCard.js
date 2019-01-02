import gql from 'graphql-tag';

import manageMyCreditCardsFragment from 'react/components/MyCreditCard/components/ManageMyCreditCards/fragments/manageMyCreditCards';
import defaultCreditCardFragment from 'react/components/MyCreditCard/components/DefaultCreditCard/fragments/defaultCreditCard';

export default gql`
  fragment MyCreditCard on Customer {
    __typename
    id
    default_credit_card {
      ...DefaultCreditCard
    }
    credit_cards {
      __typename
      id
    }
    ...ManageMyCreditCards
  }
  ${manageMyCreditCardsFragment}
  ${defaultCreditCardFragment}
`;
