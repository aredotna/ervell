import gql from 'graphql-tag';

import avatarUploaderFragment from 'v2/components/ProfileMetadata/components/ProfileAvatar/components/AvatarUploader/fragments/avatarUploader';

export default gql`
  query UploadPolicy {
    me {
      ...AvatarUploader
    }
  }
  ${avatarUploaderFragment}
`;
