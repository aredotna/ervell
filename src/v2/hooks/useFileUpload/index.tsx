import { useState, useEffect, useCallback } from 'react'
import { uploadFile, S3UploadPolicy } from 'v2/util/uploader'

interface UseFileUploadProps {
  policy: S3UploadPolicy
  onUpload: (url: string) => void
  file: File
}

const useFileUpload = ({ onUpload, file, policy }: UseFileUploadProps) => {
  const [fileUrl, setFileUrl] = useState(null)

  const onFileUpload = useCallback(() => {
    onUpload(fileUrl)
  }, [fileUrl, onUpload])

  useEffect(() => {
    if (file) {
      uploadFile({
        policy,
        file,
        onDone: setFileUrl,
      }).then(onFileUpload)
    }
  }, [file, policy, onFileUpload])

  return {
    url: fileUrl,
  }
}

export default useFileUpload
