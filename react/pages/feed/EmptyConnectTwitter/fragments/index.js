import gql from 'graphql-tag';

export default gql`
  fragment EmptyFeedCheck on Me {
    id
    authenticated_service {
      id
    }
  }
`;
