import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment ManagedMember on Member {
    __typename
    ... on User {
      id: slug
      name
      href
      ...MemberAvatar
    }
    ... on Group {
      id: slug
      name
      ...MemberAvatar
      counts {
        users
      }
    }
  }
  ${memberAvatarFragment}
`;
