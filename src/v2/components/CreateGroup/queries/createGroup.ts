import gql from 'graphql-tag';

import createGroupFragment from 'v2/components/CreateGroup/fragments/createGroup';

export default gql`
  query CreateGroup {
    me {
      ...CreateGroup
    }
  }
  ${createGroupFragment}
`;
