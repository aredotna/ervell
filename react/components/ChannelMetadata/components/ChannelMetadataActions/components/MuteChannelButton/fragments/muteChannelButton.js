import gql from 'graphql-tag';

export default gql`
  fragment MuteChannelButton on Channel {
    __typename
    id
    is_muted
  }
`;
