import React, { Component } from 'react';

import Title from 'react/components/UI/Head/components/Title';
import CenteringBox from 'react/components/UI/CenteringBox';
import ForgotPasswordForm from 'react/components/ForgotPasswordForm';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Title>
          Reset Your Password
        </Title>

        <ForgotPasswordForm />
      </CenteringBox>
    );
  }
}
