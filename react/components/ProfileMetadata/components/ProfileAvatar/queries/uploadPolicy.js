import gql from 'graphql-tag';

export default gql`
 query UploadPolicy {
    me {
      __typename
      id
      policy {
        AWSAccessKeyId
        acl
        bucket
        expires
        key
        policy
        signature
        success_action_status
      }
    }
  }
`;
