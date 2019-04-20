import gql from 'graphql-tag';

import uploaderFragment from 'react/components/CustomBadgeUploader/fragments/uploader';

export default gql`
  query UploadPolicy {
    me {
      ...Uploader
    }
  }
  ${uploaderFragment}
`;
