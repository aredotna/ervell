import gql from 'graphql-tag';

import privateBlocksMeterFragment from 'react/components/PrivateBlocksMeter/fragments/privateBlocksMeter';

export default gql`
  fragment PlanSelection on Me {
    customer {
      __typename
      id
      is_canceled
      is_lifetime
      is_beneficiary
      plan {
        __typename
        id
      }
    }
    ...PrivateBlocksMeter
  }
  ${privateBlocksMeterFragment}
`;
