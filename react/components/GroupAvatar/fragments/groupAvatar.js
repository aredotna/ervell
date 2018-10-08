import gql from 'graphql-tag';

export default gql`
  fragment GroupAvatar on Group {
    href
    initials
    avatar(size: LARGE)
  }
`;
