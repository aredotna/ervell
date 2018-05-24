import gql from 'graphql-tag';

export default gql`
  fragment ChannelMetadataInfo on Channel {
    __typename
    id: slug
    href
    visibility
    info: description(format: HTML)
    counts {
      followers
    }
  }
`;
