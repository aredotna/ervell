export default ({ file, policy }) => {
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
