import gql from 'graphql-tag';

import userAvatarFragment from 'react/components/UserAvatar/fragments/userAvatar';

export default gql`
  fragment UserAvatarButton on User {
    id
    ...UserAvatar
  }
  ${userAvatarFragment}
`;
