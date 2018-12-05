import gql from 'graphql-tag';

import createGroupFragment from 'react/components/CreateGroup/fragments/createGroup';

export default gql`
  query CreateGroup {
    me {
      ...CreateGroup
    }
  }
  ${createGroupFragment}
`;
