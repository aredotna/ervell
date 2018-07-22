import React, { Component } from 'react';

import AuthLoginForm from 'react/components/AuthLoginForm';
import PageContainer from 'react/components/UI/PageContainer';

export default class AuthLoginPage extends Component {
  render() {
    return (
      <PageContainer>
        <AuthLoginForm />
      </PageContainer>
    );
  }
}
