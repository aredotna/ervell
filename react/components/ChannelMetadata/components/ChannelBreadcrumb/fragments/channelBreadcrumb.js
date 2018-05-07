import gql from 'graphql-tag';

export default gql`
  fragment ChannelBreadcrumb on Channel {
    __typename
    id: slug
    title
    href
    visibility
    owner: user {
      __typename
      id
      name
      href
    }
  }
`;
