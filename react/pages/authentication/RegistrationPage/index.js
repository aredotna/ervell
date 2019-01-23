import React, { Component } from 'react';

import Title from 'react/components/UI/Head/components/Title';
import CenteringBox from 'react/components/UI/CenteringBox';
import RegistrationForm from 'react/components/RegistrationForm';

export default class RegistrationPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Title>
          Join
        </Title>

        <RegistrationForm />
      </CenteringBox>
    );
  }
}
