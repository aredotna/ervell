import gql from 'graphql-tag';

export default gql`
  fragment ChannelMetadataConnections on Channel {
    __typename
    _id: id
    id: slug
    connections {
      id: slug
      label: title
      href
    }
  }
`;
