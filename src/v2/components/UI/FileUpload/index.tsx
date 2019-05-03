import { useState, useEffect } from 'react'

import { uploadFile, S3UploadPolicy } from 'v2/util/uploader'

interface Props {
  policy: S3UploadPolicy
  file: File
  onUpload: ({ url, file }: { url: string; file: File }) => any
  children: ({
    file,
    url,
    progress,
  }: {
    file: File
    url?: string
    progress: number
  }) => any
}

export const FileUpload: React.FC<Props> = ({
  policy,
  file,
  children,
  onUpload,
}) => {
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

  return children({
    file,
    url: fileUrl,
    progress: fileProgress,
  })
}
