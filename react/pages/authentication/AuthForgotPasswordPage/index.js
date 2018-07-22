import React, { Component } from 'react';

import AuthForgotPasswordForm from 'react/components/AuthForgotPasswordForm';
import PageContainer from 'react/components/UI/PageContainer';

export default class AuthForgotPasswordPage extends Component {
  render() {
    return (
      <PageContainer>
        <AuthForgotPasswordForm />
      </PageContainer>
    );
  }
}
