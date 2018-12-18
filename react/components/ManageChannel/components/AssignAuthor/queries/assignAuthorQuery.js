import gql from 'graphql-tag';

import avatarFragment from 'react/components/UserAvatar/fragments/userAvatar';
import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  query AssignAuthorQuery {
    me {
      __typename
      id
      name
      ... UserAvatar
      groups(page: 1, per: 25) {
        __typename
        id
        name
        visibility
        ... MemberAvatar
      }
    }
  }
  ${memberAvatarFragment}
  ${avatarFragment}
`;
