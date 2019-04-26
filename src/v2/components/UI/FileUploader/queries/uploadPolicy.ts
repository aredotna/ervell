import gql from 'graphql-tag'

import uploadPolicyFragment from 'v2/components/UI/FileUploader/fragments/uploadPolicy'

export default gql`
  query UploadPolicy {
    me {
      __typename
      id
      ...UploadPolicy
    }
  }
  ${uploadPolicyFragment}
`
