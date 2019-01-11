import gql from 'graphql-tag';

export default gql`
  mutation hasSeenTwitterConnectMutation {
    update_flag(input: { name: HAS_SEEN_FEED_CONNECT_TWITTER, value: true }) {
      flags {
        __typename
        has_seen_feed_connect_twitter
      }
    }
  }
`;
