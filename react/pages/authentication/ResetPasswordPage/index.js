import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import ResetPasswordForm from 'react/components/ResetPasswordForm';

export default class ResetPasswordPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <ResetPasswordForm />
      </CenteringBox>
    );
  }
}
