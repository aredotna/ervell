import gql from 'graphql-tag';

export default gql`
  fragment EmptyFeedCheck on Me {
    authenticated_service {
      id
    }
  }
`;
