import gql from 'graphql-tag';

export default gql`
  fragment ConnectableMetadata on ConnectableInterface {
    title
    user {
      id
      name
    }
    connection {
      created_at(relative: true)
      user {
        id
        name
      }
    }
    ... on Attachment {
      file_extension
    }
  }
`;
