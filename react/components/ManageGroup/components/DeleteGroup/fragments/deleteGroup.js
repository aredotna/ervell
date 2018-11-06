import gql from 'graphql-tag';

export default gql`
  fragment DeleteGroup on Group {
    id: slug
    name
  }
`;
