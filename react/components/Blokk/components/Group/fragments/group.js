import gql from 'graphql-tag';

import avatarFragment from 'react/components/GroupAvatar/fragments/groupAvatar';


export default gql`
  fragment Group on Group {
    id
    name
    href
    ...GroupAvatar
  }
  ${avatarFragment}
`;
