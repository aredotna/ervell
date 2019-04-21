import React, { Component } from 'react';

import Title from 'v2/components/UI/Head/components/Title';
import CenteringBox from 'v2/components/UI/CenteringBox';
import LoginForm from 'v2/components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Title>Login</Title>

        <LoginForm />
      </CenteringBox>
    );
  }
}
