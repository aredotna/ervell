import React, { Component } from 'react';

import Title from 'v2/components/UI/Head/components/Title';
import CenteringBox from 'v2/components/UI/CenteringBox';
import ForgotPasswordForm from 'v2/components/ForgotPasswordForm';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Title>Reset Your Password</Title>

        <ForgotPasswordForm />
      </CenteringBox>
    );
  }
}
