import gql from 'graphql-tag';

import userAvatarFragment from 'react/components/UserAvatar/fragments/userAvatar';

export default gql`
  fragment PendingGroupUser on User {
    id
    name
    href
    hidden_email
    ...UserAvatar
  }
  ${userAvatarFragment}
`;
