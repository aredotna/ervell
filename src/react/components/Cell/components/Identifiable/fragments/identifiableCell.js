import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment IdentifiableCell on Identifiable {
    __typename
    ... on User {
      id
      name
      href
    }
    ... on Group {
      id
      name
      href
      visibility
    }
    ... MemberAvatar
  }
  ${memberAvatarFragment}
`;
