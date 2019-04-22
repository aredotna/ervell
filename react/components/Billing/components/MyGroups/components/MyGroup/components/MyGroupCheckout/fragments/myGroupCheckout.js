import gql from 'graphql-tag';

import myCreditCardFragment from 'react/components/MyCreditCard/fragments/myCreditCard';

export default gql`
  fragment MyGroupCheckout on Me {
    __typename
    id
    customer {
      __typename
      id
      ...MyCreditCard
    }
  }
  ${myCreditCardFragment}
`;
