import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import ForgotPasswordForm from 'react/components/ForgotPasswordForm';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <ForgotPasswordForm />
      </CenteringBox>
    );
  }
}
