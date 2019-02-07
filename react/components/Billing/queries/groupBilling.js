import gql from 'graphql-tag';

import groupBillingFragment from 'react/components/Billing/fragments/groupBilling';

export default gql`
  query GroupBilling {
    me {
      __typename
      id
      ...GroupBilling
    }
  }
  ${groupBillingFragment}
`;
