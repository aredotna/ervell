import gql from 'graphql-tag';

export default gql`
  fragment ChannelMetadataActions on Channel {
    __typename
    id: slug
    can {
      follow
      manage
      mute
    }
  }
`;
