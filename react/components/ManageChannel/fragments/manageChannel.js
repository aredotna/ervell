import gql from 'graphql-tag';

import transferChannelFragment from 'react/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment';

export default gql`
  fragment ManageChannel on Channel {
    id
    href
    title
    description(format: MARKDOWN)
    visibility
    content_flag
    can {
      destroy
      export
    }
    owner {
      __typename
      ... on User {
        id
      }
      ... on Group {
        id
      }
    }
    ...TransferChannel
  }
  ${transferChannelFragment}
`;
