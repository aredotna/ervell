import gql from 'graphql-tag';

export default gql`
  fragment ProfileTips on Me {
    __typename
    id
    has_seen_classic_channels: flag(name: "has_seen_classic_channels")
    has_seen_bookmarklet_message: flag(name: "has_seen_bookmarklet_message")
    counts {
      channels
      blocks
    }
  }
`;
