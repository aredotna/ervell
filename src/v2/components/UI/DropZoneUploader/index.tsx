import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { eventWithFiles as isEventWithFiles } from 'v2/util/is'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import FileUploader from 'v2/components/UI/FileUploader'

const DropZone = styled(Box)`
  ${props => `display: ${{ resting: 'none', active: 'block' }[props.mode]};`}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`

const Backdrop = styled(Box).attrs({
  bg: 'utility.translucent',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
`

interface Props {
  children: ({
    isDragActive,
    openUploadDialog,
  }: {
    isDragActive: boolean
    openUploadDialog: () => any
  }) => React.ReactNode
  onUpload: ({ url, file }: { url: string; file: File }) => any
  onComplete: () => any
  accept: string
}

const DropZoneUploader: React.FC<Props> = ({
  children,
  onUpload,
  onComplete,
  accept,
}) => {
  const [mode, setMode] = useState('resting')

  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) setMode('active')
  }, [])

  const handleErrors = useCallback(err => {
    console.error(err)
    setMode('error')
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openUploadDialog,
    acceptedFiles,
  } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: () => setMode('resting'),
    onDragLeave: () => setMode('resting'),
    noClick: true,
    noKeyboard: true,
    accept,
    maxSize: 250000000, // 25mb
  })

  // Use `dragenter` event on `window` to trigger the actual drop-zone,
  // instead of the Component's element.
  const showDropZone = useCallback(e => {
    if (isEventWithFiles(e)) setMode('active')
  }, [])

  useEffect(() => {
    window.addEventListener('dragenter', showDropZone)
    return () => {
      window.removeEventListener('dragenter', showDropZone)
    }
  }, [showDropZone])

  return (
    <>
      <DropZone {...getRootProps()} mode={mode}>
        <input {...getInputProps()} />

        <Backdrop>
          {
            <>
              <Text f={7} color="gray.semiBold" textAlign="center">
                Drop files to add
              </Text>
              <Text f={2} mt={6} color="gray.medium" textAlign="center">
                Max file size for images is 25MB, and for all other files 250mb
              </Text>
            </>
          }

          {mode === 'error' && (
            <Text
              mb={6}
              f={8}
              color="state.alert"
              textAlign="center"
              underlineLinks
            >
              There was a problem uploading your files.{' '}
              <Link onClick={onComplete}>Close</Link>
            </Text>
          )}

          {acceptedFiles.length > 0 && mode !== 'error' && (
            <FileUploader
              files={acceptedFiles}
              onUpload={onUpload}
              onComplete={onComplete}
              onError={handleErrors}
            />
          )}
        </Backdrop>
      </DropZone>

      {children({ isDragActive, openUploadDialog })}
    </>
  )
}

export default DropZoneUploader
