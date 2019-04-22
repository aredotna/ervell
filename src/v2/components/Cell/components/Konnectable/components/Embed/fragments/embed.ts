import gql from 'graphql-tag';

export default gql`
  fragment Embed on Embed {
    id
    title
    href
    src: image_url(size: DISPLAY)
  }
`;
