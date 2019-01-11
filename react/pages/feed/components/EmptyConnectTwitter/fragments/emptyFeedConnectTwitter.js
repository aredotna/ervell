import gql from 'graphql-tag';

export default gql`
  fragment EmptyFeedConnectTwitter on Me {
    __typename
    id
    twitter_authentication: authenticated_service(provider: TWITTER) {
      __typename
      id
    }
  }
`;
