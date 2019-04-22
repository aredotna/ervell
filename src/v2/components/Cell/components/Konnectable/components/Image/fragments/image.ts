import gql from 'graphql-tag';

export default gql`
  fragment Image on Image {
    id
    title
    href
    src: image_url(size: DISPLAY)
  }
`;
