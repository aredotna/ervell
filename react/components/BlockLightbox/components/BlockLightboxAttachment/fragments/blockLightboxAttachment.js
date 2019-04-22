import gql from 'graphql-tag';

export default gql`
  fragment BlockLightboxAttachment on Konnectable {
    __typename
    ... on Attachment {
      id
      title
      file_extension
      file_url
      file_size
      file_content_type
      image_url(size: DISPLAY)
    }
  }
`;
