import axios from 'axios'

import buildFormDataFromFile from 'v2/components/UI/FileUploader/lib/buildFormDataFromFile'

const parseLocationFromS3Response = data => {
  const parser = new DOMParser()
  const parsed = parser.parseFromString(data, 'text/xml')
  return parsed.getElementsByTagName('Location')[0].childNodes[0].nodeValue
}

export default ({ file, policy, setFileProgress, setFileUrl }) => {
  const formData = buildFormDataFromFile({ file, policy })

  return axios
    .post(policy.bucket, formData, {
      responseType: 'text',
      onUploadProgress: progressEvent => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        setFileProgress(progress)
      },
    })
    .then(({ data }) => parseLocationFromS3Response(data))
    .then(url => {
      setFileUrl(url)
      return { file, url }
    })
}
