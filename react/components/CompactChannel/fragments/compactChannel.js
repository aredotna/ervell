import gql from 'graphql-tag';

export default gql`
  fragment CompactChannel on Channel {
    __typename
    id: slug
    visibility
    title
    owner {
      name
    }
    counts {
      contents
    }
  }
`;
