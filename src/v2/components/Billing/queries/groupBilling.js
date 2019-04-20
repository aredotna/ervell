import gql from 'graphql-tag';

import groupBillingFragment from 'v2/components/Billing/fragments/groupBilling';

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
