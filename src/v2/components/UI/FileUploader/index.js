import { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import uploadPolicyQuery from 'v2/components/UI/FileUploader/queries/uploadPolicy';

import uploadFile from 'v2/components/UI/FileUploader/lib/uploadFile';

const FileUploader = ({
  client,
  files,
  children,
  onComplete,
  onUpload,
  onError,
}) => {
  const decoratedFiles = files.map(file => {
    const [fileProgress, setFileProgress] = useState(0);
    const [fileUrl, setFileUrl] = useState(null);
    return {
      file,
      progress: fileProgress,
      setFileProgress,
      url: fileUrl,
      setFileUrl,
    };
  });

  useEffect(() => {
    client
      .query({ query: uploadPolicyQuery })
      .then(({ data: { me: { policy } } }) =>
        // Handle uploads in parallel
        Promise.all(
          decoratedFiles.map(({ file, setFileProgress, setFileUrl }) =>
            // Handle each upload
            uploadFile({
              policy,
              file,
              setFileProgress,
              setFileUrl,
            }).then(onUpload)
          )
        )
      )
      .then(filesWithUrls => onComplete({ filesWithUrls }))
      .catch(onError);
  }, []);

  return children({ files: decoratedFiles });
};

FileUploader.propTypes = {
  children: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }).isRequired,
  onUpload: PropTypes.func,
  onComplete: PropTypes.func,
  onError: PropTypes.func,
};

FileUploader.defaultProps = {
  onComplete: () => {},
  onUpload: () => {},
  onError: () => {},
};

export default withApollo(FileUploader);
