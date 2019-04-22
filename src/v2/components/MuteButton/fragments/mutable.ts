import gql from 'graphql-tag';

export default gql`
  fragment Mutable on MutableType {
    __typename
    ... on Channel {
      id
      is_muted
    }
    ... on Connectable {
      id
      is_muted
    }
  }
`;
