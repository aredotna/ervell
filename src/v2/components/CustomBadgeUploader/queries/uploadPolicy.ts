import gql from 'graphql-tag'

import uploaderFragment from 'v2/components/CustomBadgeUploader/fragments/uploader'

export default gql`
  query UploadPolicy {
    me {
      ...Uploader
    }
  }
  ${uploaderFragment}
`
