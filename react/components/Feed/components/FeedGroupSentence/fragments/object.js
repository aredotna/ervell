import gql from 'graphql-tag';

export default gql`
  fragment FeedObject on DeedKind {
    __typename

    ... on Channel {
      id
      label: title
      href
      visibility
    }

    ... on Connectable {
      id
      label: to_s
      href
    }

    ... on User {
      id
      label: name
      href
    }

    ... on Comment {
      id
      body(truncate: 100)
    }

    ... on Group {
      id
      label: name
      href
    }
  }
`;
