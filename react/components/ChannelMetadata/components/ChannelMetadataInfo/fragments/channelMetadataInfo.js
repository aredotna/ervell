import gql from 'graphql-tag';

export default gql`
  fragment ChannelMetadataInfo on Channel {
    __typename
    id
    href
    visibility
    info: description(format: HTML)
    counts {
      followers
    }
    user {
      href
      name
    }
  }
`;
