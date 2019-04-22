import gql from 'graphql-tag';

export default gql`
  fragment Link on Link {
    href
    src: image_url(size: DISPLAY)
    external_url: source_url
  }
`;
