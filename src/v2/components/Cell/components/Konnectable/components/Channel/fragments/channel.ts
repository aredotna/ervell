import gql from 'graphql-tag';

import channelOverlayFragment from 'v2/components/Cell/components/Konnectable/components/ChannelOverlay/fragments/channelOverlay';

export default gql`
  fragment Channel on Channel {
    id
    href
    truncatedTitle: title(truncate: 80)
    visibility
    updated_at(relative: true)
    counts {
      __typename
      contents
    }
    owner {
      __typename
      ... on Group {
        id
        name
        visibility
      }
      ... on User {
        id
        name
      }
    }
    ...ChannelOverlay
  }
  ${channelOverlayFragment}
`;
