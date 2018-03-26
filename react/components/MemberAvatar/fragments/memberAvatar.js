import gql from 'graphql-tag';

export default gql`
  fragment MemberAvatar on Member {
    ... on User {
      href
      initials
      avatar(size: LARGE)
    }

    ... on Group {
      initials
    }
  }
`;
