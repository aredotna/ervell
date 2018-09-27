import gql from 'graphql-tag';

export default gql`
  fragment ModelMetadata on Model {
    updated_at(relative: true)
  }
`;
