import gql from 'graphql-tag';

export default gql`
  fragment ChannelMetadataConnections on Channel {
    __typename
    id: slug

    can {
      connect
    }

    connections {
      id: slug
      label: title
      href
    }
  }
`;
