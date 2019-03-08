import gql from 'graphql-tag';

import channelPreviewBlockFragment from 'react/components/Cell/components/Konnectable/components/ChannelPreview/components/ChannelPreviewBlocks/fragments/channelPreviewBlock';

export default gql`
  query ChannelPreview($id: ID!, $amount: Int!) {
    channel(id: $id) {
      __typename
      id
      blocks: blokks(per: $amount, type: BLOCK, sort_by: CREATED_AT, direction: DESC) {
        ...ChannelPreviewBlock
      }
    }
  }
  ${channelPreviewBlockFragment}
`;
