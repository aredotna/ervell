import gql from 'graphql-tag';

import avatarFragment from 'react/components/UserAvatar/fragments/userAvatar';


export default gql`
  fragment User on User {
    id
    name
    href
    ...UserAvatar
  }
  ${avatarFragment}
`;
