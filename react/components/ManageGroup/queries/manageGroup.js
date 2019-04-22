import gql from 'graphql-tag';

import manageGroupFragment from 'react/components/ManageGroup/fragments/manageGroup';

export default gql`
  query ManageGroupQuery($id: ID!) {
    group(id: $id) {
      ...ManageGroup
    }
  }
  ${manageGroupFragment}
`;
