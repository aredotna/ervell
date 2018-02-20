import gql from 'graphql-tag';

import avatarFragment from 'react/components/Avatar/fragments/avatar';

export default gql`
  fragment ManagedCollaborator on User {
    id
    name
    href
    ...Avatar
  }
  ${avatarFragment}
`;
