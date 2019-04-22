import gql from 'graphql-tag';

export default gql`
  fragment UserAvatar on UserInterface {
    href
    initials
    avatar(size: LARGE)
  }
`;
