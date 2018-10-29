import gql from 'graphql-tag';

export default gql`
  fragment ProfileEmptyMessage on User {
    is_me
  }
`;
