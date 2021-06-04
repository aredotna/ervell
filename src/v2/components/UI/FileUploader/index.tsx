import React, { useEffect, useState, useCallback } from 'react'
import { Query } from '@apollo/client/react/components'

import { UploadPolicy } from '__generated__/UploadPolicy'

import { uploadPolicyQuery } from 'v2/util/uploader'

import Box from 'v2/components/UI/Box'
import { FileUpload } from 'v2/components/UI/FileUpload'
import { ProgressBar } from 'v2/components/UI/ProgressBar'

interface Props {
  files: File[]
  onUpload: ({ url, file }: { url: string; file: File }) => any
  onComplete: () => any
  onError?: (err: Error) => any
}

const FileUploader: React.FC<Props> = ({
  files,
  onComplete = () => {},
  onUpload = () => {},
  onError = () => {},
}) => {
  const [uploads, setUploads] = useState(files)

  useEffect(() => {
    if (uploads.length === 0) {
      onComplete()
    }
  }, [uploads, onComplete])

  const completeUpload = useCallback(
    ({ url, file }) => {
      setUploads(prevUploads =>
        prevUploads.filter(prevFile => file !== prevFile)
      )

      onUpload({ url, file })
    },
    [onUpload]
  )

  return (
    <Query<UploadPolicy> query={uploadPolicyQuery} onError={onError}>
      {({ data, error, loading }) => {
        if (error || loading) return <div />

        const {
          me: { policy },
        } = data

        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            p={6}
          >
            {files.map(file => (
              <FileUpload
                key={file.name}
                file={file}
                policy={policy}
                onUpload={completeUpload}
              >
                {({ file, progress }) => (
                  <ProgressBar
                    label={file.name}
                    size={file.size}
                    progress={progress}
                  />
                )}
              </FileUpload>
            ))}
          </Box>
        )
      }}
    </Query>
  )
}

export default FileUploader
