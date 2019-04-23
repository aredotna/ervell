import gql from 'graphql-tag';

export default gql`
  query hasGroups {
    me {
      groups(type: OWNER) {
        id
      }
    }
  }
`;
