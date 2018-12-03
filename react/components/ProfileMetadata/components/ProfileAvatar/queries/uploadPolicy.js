import gql from 'graphql-tag';

import avatarUploaderFragment from 'react/components/ProfileMetadata/components/ProfileAvatar/components/AvatarUploader/fragments/avatarUploader';

export default gql`
  query UploadPolicy {
    me {
      ...AvatarUploader
    }
  }
  ${avatarUploaderFragment}
`;
