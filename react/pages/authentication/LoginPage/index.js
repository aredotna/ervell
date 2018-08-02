import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import LoginForm from 'react/components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <LoginForm />
      </CenteringBox>
    );
  }
}
