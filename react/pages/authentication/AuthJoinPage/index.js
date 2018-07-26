import React, { Component } from 'react';

import AuthJoinForm from 'react/components/AuthJoinForm';
import PageContainer from 'react/components/UI/PageContainer';

export default class AuthJoinPage extends Component {
  render() {
    return (
      <PageContainer>
        <AuthJoinForm />
      </PageContainer>
    );
  }
}
