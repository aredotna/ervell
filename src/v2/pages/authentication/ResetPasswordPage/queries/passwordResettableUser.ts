import { gql } from '@apollo/client'

import passwordResettableUserFragment from 'v2/pages/authentication/ResetPasswordPage/fragments/passwordResettableUser'

export default gql`
  query PasswordResettableUser($reset_password_token: String!) {
    password_resettable_user(reset_password_token: $reset_password_token) {
      ...PasswordResettableUser
    }
  }
  ${passwordResettableUserFragment}
`
