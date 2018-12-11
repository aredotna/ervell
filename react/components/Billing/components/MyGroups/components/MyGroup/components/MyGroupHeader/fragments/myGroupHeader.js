import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment MyGroupHeader on Group {
    __typename
    id
    name
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`;
