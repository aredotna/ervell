import axios from 'axios'
import { gql } from '@apollo/client'

export interface S3UploadPolicy {
  key: string
  AWSAccessKeyId: string
  acl: string
  success_action_status: string
  policy: string
  signature: string
  bucket: string
}

export const uploadPolicyFragment = gql`
  fragment AvatarUploader on Me {
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
`

export const uploadPolicyQuery = gql`
  query UploadPolicy {
    me {
      __typename
      id
      ...AvatarUploader
    }
  }
  ${uploadPolicyFragment}
`

export const buildFormDataFromFile = ({
  file,
  policy,
}: {
  file: File
  policy: S3UploadPolicy
}): FormData => {
  const formData = new FormData()

  formData.append('Content-Type', file.type)
  formData.append('key', policy.key)
  formData.append('AWSAccessKeyId', policy.AWSAccessKeyId)
  formData.append('acl', policy.acl)
  formData.append('success_action_status', policy.success_action_status)
  formData.append('policy', policy.policy)
  formData.append('signature', policy.signature)
  formData.append('file', file)

  return formData
}

export const parseLocationFromS3Response = (data: string) => {
  const parser = new DOMParser()
  const parsed = parser.parseFromString(data, 'text/xml')
  return parsed.getElementsByTagName('Location')[0].childNodes[0].nodeValue
}

export const uploadFile = ({
  file,
  policy,
  onFileProgress = () => {},
  onDone = () => {},
}: {
  file: File
  policy: S3UploadPolicy
  onFileProgress?: (progress: number) => any
  onDone?: (url: string) => any
}): Promise<{
  file: File
  url: string
}> => {
  const formData = buildFormDataFromFile({ file, policy })

  return axios
    .post(policy.bucket, formData, {
      responseType: 'text',
      onUploadProgress: progressEvent => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onFileProgress(progress)
      },
    })
    .then(({ data }) => parseLocationFromS3Response(data))
    .then(url => {
      onDone(url)
      return { file, url }
    })
}
