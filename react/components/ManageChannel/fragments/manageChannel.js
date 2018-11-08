import gql from 'graphql-tag';

import transferChannelFragment from 'react/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment';

export default gql`
  fragment ManageChannel on Channel {
    id
    href
    title
    description(format: MARKDOWN)
    visibility
    can {
      destroy
      export
    }
    ...TransferChannel
  }
  ${transferChannelFragment}
`;
