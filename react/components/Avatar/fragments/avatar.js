import gql from 'graphql-tag';

export default gql`
  fragment Avatar on UserInterface {
    href
    initials
    avatar(size: LARGE)
  }
`;
