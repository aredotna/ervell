import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

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

const DropZoneUploader = ({ children, onUpload, onComplete, accept }) => {
  const [mode, setMode] = useState('resting')

  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) setMode('active')
  }, [])

  const handleErrors = err => {
    console.error(err)
    setMode('error')
  }

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
  })

  // Use `dragenter` event on `window` to trigger the actual drop-zone,
  // instead of the Component's element.
  const showDropZone = () => setMode('active')
  const handleFalseDrops = e => {
    if (!e.dataTransfer.types.includes('Files')) {
      // If you accidently drag some link on the page around, cancel
      setMode('resting')
    }
  }

  useEffect(() => {
    window.addEventListener('dragenter', showDropZone)
    window.addEventListener('drop', handleFalseDrops)
    return () => {
      window.removeEventListener('dragenter', showDropZone)
      window.removeEventListener('drop', handleFalseDrops)
    }
  })

  return (
    <>
      <DropZone {...getRootProps()} mode={mode}>
        <input {...getInputProps()} />

        <Backdrop>
          {isDragActive && (
            <Text f={9} color="gray.base" textAlign="center">
              Drop files to add
            </Text>
          )}

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

DropZoneUploader.propTypes = {
  children: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
}

DropZoneUploader.defaultProps = {}

export default DropZoneUploader
