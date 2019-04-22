import gql from 'graphql-tag';

export default gql`
  fragment Invitee on Invitee {
    __typename
    id
    email
  }
`;
