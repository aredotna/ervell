import gql from 'graphql-tag';

export default gql`
  fragment ModelBlokkOverlay on Model {
    __typename
    id
  }
`;
