import { useState, useEffect } from 'react'
import { uploadFile, S3UploadPolicy } from 'v2/util/uploader'

interface useFileUploadProps {
  policy: S3UploadPolicy
  onUpload: () => void
  file: File
}

const useFileUpload = ({ onUpload, file, policy }: useFileUploadProps) => {
  const [fileProgress, setFileProgress] = useState(0)
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    uploadFile({
      policy,
      file,
      onFileProgress: setFileProgress,
      onDone: setFileUrl,
    }).then(onUpload)
  }, [file, onUpload, policy])

  return {
    fileProgress,
    fileUrl,
  }
}

export default useFileUpload
