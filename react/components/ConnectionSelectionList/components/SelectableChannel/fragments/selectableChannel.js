import gql from 'graphql-tag';

export default gql`
  fragment SelectableChannel on Channel {
    __typename
    id
    title
    visibility
    user {
      name
    }
  }
`;
