import gql from 'graphql-tag';

import profileAvatarFragment from 'react/components/ProfileMetadata/components/ProfileAvatar/fragments/profileAvatar';

export default gql`
 query ProfileAvatar($id: ID!) {
    group(id: $id) {
      ... ProfileAvatar
    }
  }
  ${profileAvatarFragment}
`;
