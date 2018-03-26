import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment CollaboratorSearchResult on Member {
    __typename
    ... on User {
      id
      name
      href
      hidden_email
      ...MemberAvatar
    }
    ... on Group {
      id
      name
      ...MemberAvatar
      counts {
        users
      }
    }
  }
  ${memberAvatarFragment}
`;
