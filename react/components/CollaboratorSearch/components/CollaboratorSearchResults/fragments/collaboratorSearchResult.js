import gql from 'graphql-tag';

import avatarFragment from 'react/components/Avatar/fragments/avatar';

export default gql`
  fragment CollaboratorSearchResult on User {
    id
    name
    href
    hidden_email
    ...Avatar
  }
  ${avatarFragment}
`;
