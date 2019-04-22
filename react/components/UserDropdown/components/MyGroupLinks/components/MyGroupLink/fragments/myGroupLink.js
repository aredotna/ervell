import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment MyGroupLink on Group {
    __typename
    id
    name
    href
    visibility
    ... MemberAvatar
  }
  ${memberAvatarFragment}
`;
