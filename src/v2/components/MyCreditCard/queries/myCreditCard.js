import gql from 'graphql-tag';

import myCreditCardFragment from 'v2/components/MyCreditCard/fragments/myCreditCard';

export default gql`
  query MyCreditCard {
    me {
      __typename
      id
      customer {
        __typename
        id
        ...MyCreditCard
      }
    }
  }
  ${myCreditCardFragment}
`;
