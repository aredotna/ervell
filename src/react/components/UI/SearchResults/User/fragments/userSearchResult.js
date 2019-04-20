import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment UserSearchResult on User {
    __typename
    id
    name
    href
    hidden_email
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`;
