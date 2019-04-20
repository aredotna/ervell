import React, { Component } from 'react';

import Title from 'react/components/UI/Head/components/Title';
import CenteringBox from 'react/components/UI/CenteringBox';
import LoginForm from 'react/components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Title>
          Login
        </Title>

        <LoginForm />
      </CenteringBox>
    );
  }
}
