import React, { Component } from 'react';

import Head from 'react/components/UI/Head';
import CenteringBox from 'react/components/UI/CenteringBox';
import RegistrationForm from 'react/components/RegistrationForm';

export default class RegistrationPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <Head>
          <title>Join</title>
        </Head>

        <RegistrationForm />
      </CenteringBox>
    );
  }
}
