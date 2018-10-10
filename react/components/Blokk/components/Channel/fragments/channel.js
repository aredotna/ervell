import gql from 'graphql-tag';

export default gql`
  fragment Channel on Channel {
    id
    href
    title
    visibility
    updated_at(relative: true)
    counts {
      blocks
    }
    owner {
      ... on Group {
        name
      }
      ... on User {
        name
      }
    }
  }
`;
