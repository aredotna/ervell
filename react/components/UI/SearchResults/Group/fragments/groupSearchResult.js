import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment GroupSearchResult on Group {
    __typename
    id
    name
    user {
      __typename
      id
      name
    }
    ...MemberAvatar
  }
  ${memberAvatarFragment}
`;
