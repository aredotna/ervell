import React, { Component } from 'react';

import Head from 'react/components/UI/Head';
import CenteringBox from 'react/components/UI/CenteringBox';
import LoginForm from 'react/components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Head>
          <title>Login</title>
        </Head>

        <LoginForm />
      </CenteringBox>
    );
  }
}
