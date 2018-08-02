import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import AuthLoginForm from 'react/components/AuthLoginForm';

export default class AuthLoginPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <AuthLoginForm />
      </CenteringBox>
    );
  }
}
