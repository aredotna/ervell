import gql from 'graphql-tag';

import userSelectorFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector';

export default gql`
  fragment UserSelection on Group {
    name
    user {
      ...UserSelector
    }
    users {
      ...UserSelector
    }
  }
  ${userSelectorFragment}
`;
