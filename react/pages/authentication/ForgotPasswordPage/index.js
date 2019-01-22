import React, { Component } from 'react';

import Head from 'react/components/UI/Head';
import CenteringBox from 'react/components/UI/CenteringBox';
import ForgotPasswordForm from 'react/components/ForgotPasswordForm';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Head>
          <title>Reset Your Password</title>
        </Head>

        <ForgotPasswordForm />
      </CenteringBox>
    );
  }
}
