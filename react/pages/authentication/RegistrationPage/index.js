import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import RegistrationForm from 'react/components/RegistrationForm';

export default class RegistrationPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <RegistrationForm />
      </CenteringBox>
    );
  }
}
