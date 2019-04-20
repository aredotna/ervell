import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Link from 'react/components/UI/Link';
import FileUploader from 'react/components/UI/FileUploader';
import FileUploaderProgressList from 'react/components/UI/FileUploaderProgressList';

const DropZone = styled(Box)`
  ${props => `display: ${{ resting: 'none', active: 'block' }[props.mode]};`}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`;

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
`;

const DropZoneUploader = ({
  children,
  onUpload,
  onComplete,
}) => {
  const [mode, setMode] = useState('resting');

  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) setMode('active');
  }, []);

  const handleErrors = (err) => {
    console.error(err);
    setMode('error');
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openUploadDialog,
    acceptedFiles,
  } = useDropzone({
    onDrop: handleDrop,
    onDragLeave: () => setMode('resting'),
    noClick: true,
    noKeyboard: true,
  });

  // Use `dragenter` event on `window` to trigger the actual drop-zone,
  // instead of the Component's element.
  const showDropZone = () => setMode('active');
  useEffect(() => {
    window.addEventListener('dragenter', showDropZone);
    return () => window.removeEventListener('dragenter', showDropZone);
  });

  return (
    <React.Fragment>
      <DropZone {...getRootProps()} mode={mode}>
        <input {...getInputProps()} />

        <Backdrop>
          {isDragActive &&
            <Text f={9} color="gray.base" textAlign="center">
              Drop files to add
            </Text>
          }

          {mode === 'error' &&
            <Text mb={6} f={8} color="state.alert" textAlign="center" underlineLinks>
              There was a problem uploading your files.{' '}
              <Link onClick={onComplete}>
                Close
              </Link>
            </Text>
          }

          {acceptedFiles.length > 0 && mode !== 'error' &&
            <FileUploader
              files={acceptedFiles}
              onUpload={onUpload}
              onComplete={onComplete}
              onError={handleErrors}
            >
              {({ files }) => (
                <FileUploaderProgressList p={6} files={files} />
              )}
            </FileUploader>
          }
        </Backdrop>
      </DropZone>

      {children({ isDragActive, openUploadDialog })}
    </React.Fragment>
  );
};

DropZoneUploader.propTypes = {
  children: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

DropZoneUploader.defaultProps = {
};

export default DropZoneUploader;
