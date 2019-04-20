import gql from 'graphql-tag';

import passwordResettableUserFragment from 'react/pages/authentication/ResetPasswordPage/fragments/passwordResettableUser';

export default gql`
  query PasswordResettableUser($reset_password_token: String!) {
    password_resettable_user(reset_password_token: $reset_password_token) {
      ...PasswordResettableUser
    }
  }
  ${passwordResettableUserFragment}
`;
