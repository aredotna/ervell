import gql from 'graphql-tag';

export default gql`
  query SerializeMeQuery {
    serializedMe @client {
      __typename
      id
      name
      initials
      avatar
      authentication_token
    }
  }
`;
