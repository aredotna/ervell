import { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import axios from 'axios';
import PropTypes from 'prop-types';

import uploadPolicyQuery from 'react/components/UI/FileUploader/queries/uploadPolicy';

const buildFormDataForFile = ({ file, policy }) => {
  const formData = new FormData();
  formData.append('Content-Type', file.type);
  formData.append('key', policy.key);
  formData.append('AWSAccessKeyId', policy.AWSAccessKeyId);
  formData.append('acl', policy.acl);
  formData.append('success_action_status', policy.success_action_status);
  formData.append('policy', policy.policy);
  formData.append('signature', policy.signature);
  formData.append('file', file);
  return formData;
};

const uploadFile = ({
  file, policy, setFileProgress, setFileUrl,
}) => {
  const formData = buildFormDataForFile({ file, policy });

  return axios
    .post(policy.bucket, formData, {
      responseType: 'text',
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setFileProgress(progress);
      },
    })
    .then(({ data }) => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(data, 'text/xml');
      return parsed.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
    })
    .then((url) => {
      setFileUrl(url);
      return { file, url };
    });
};

const FileUploader = ({
  client, files, children,
  onComplete, onUpload, onError,
}) => {
  const decoratedFiles = files.map((file) => {
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
    client.query({ query: uploadPolicyQuery })
      .then(({ data: { me: { policy } } }) =>
        // Handle uploads in parallel
        Promise.all(decoratedFiles.map(({ file, setFileProgress, setFileUrl }) =>
          // Handle each upload
          uploadFile({
            policy,
            file,
            setFileProgress,
            setFileUrl,
          }).then(onUpload))))
      .then(filesWithUrls => onComplete({ filesWithUrls }))
      .catch(onError);
  }, []);

  return children({ files: decoratedFiles });
};

FileUploader.propTypes = {
  children: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
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

