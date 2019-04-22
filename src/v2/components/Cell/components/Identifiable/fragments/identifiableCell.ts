import gql from 'graphql-tag';

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar';

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
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`;
