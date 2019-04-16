import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import formatFileSize from 'react/util/formatFileSize';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  user-select: none;
`;

const File = styled(Box)`
  width: 100%;
  position: relative;
`;

const Progress = styled(Box).attrs({
  bg: 'gray.light',
})`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => props.progress}%;
`;

const FileUploaderProgressList = ({ files, ...rest }) => (
  <Container {...rest}>
    {files.map(({ file, progress }) => (
      <File mb={3} py={5} px={6}>
        <Progress progress={progress} />

        <Box position="relative">
          <Text textAlign="center" key={file.path}>
            <strong>{file.path}</strong>{' '}
            ({formatFileSize(file.size)}){' '}
            {progress}%
          </Text>
        </Box>
      </File>
    ))}
  </Container>
);

FileUploaderProgressList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    file: PropTypes.shape({
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }).isRequired,
    progress: PropTypes.number.isRequired,
  })).isRequired,
};

export default FileUploaderProgressList;
