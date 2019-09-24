import gql from 'graphql-tag'

import uploadPolicyFragment from 'v2/components/BlockLightbox/components/BlockLightboxActions/components/BlockLightboxChangeThumbnail/fragments/policy'

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
