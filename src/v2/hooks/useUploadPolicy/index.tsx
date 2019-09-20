import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { S3UploadPolicy } from 'v2/util/uploader'

const UPLOAD_POLICY_QUERY = gql`
  query MePolicyQuery {
    me {
      __typename
      id
      policy {
        __typename
        AWSAccessKeyId
        acl
        bucket
        expires
        key
        policy
        signature
        success_action_status
      }
    }
  }
`

const useUploadPolicy = () => {
  const { data, loading, error } = useQuery(UPLOAD_POLICY_QUERY)

  return {
    policy: data && data.me && (data.me.policy as S3UploadPolicy),
    loading,
    error,
  }
}

export default useUploadPolicy
