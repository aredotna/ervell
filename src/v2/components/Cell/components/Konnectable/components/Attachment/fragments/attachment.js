import gql from 'graphql-tag';

export default gql`
  fragment Attachment on Attachment {
    id
    title
    href
    src: image_url(size: DISPLAY)
    file_extension
  }
`;
