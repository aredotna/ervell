import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import AuthForgotPasswordForm from 'react/components/AuthForgotPasswordForm';

export default class AuthForgotPasswordPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <AuthForgotPasswordForm />
      </CenteringBox>
    );
  }
}
