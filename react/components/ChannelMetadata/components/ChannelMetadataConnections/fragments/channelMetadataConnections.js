import gql from 'graphql-tag';

export default gql`
  fragment ChannelMetadataConnections on Channel {
    __typename
    id: slug

    can {
      connect
    }

    connected_to_channels {
      id: slug
      label: title
      href
    }
  }
`;
