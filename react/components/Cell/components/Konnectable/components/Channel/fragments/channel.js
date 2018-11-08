import gql from 'graphql-tag';

import channelOverlayFragment from 'react/components/Cell/components/Konnectable/components/ChannelOverlay/fragments/channelOverlay';

export default gql`
  fragment Channel on Channel {
    id
    href
    title
    visibility
    updated_at(relative: true)
    counts {
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
    ... ChannelOverlay
  }
  ${channelOverlayFragment}
`;
