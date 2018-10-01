import gql from 'graphql-tag';

export default gql`
  fragment ConnectableBlokkOverlay on ConnectableInterface {
    __typename
    source {
      url
    }
  }
`;
