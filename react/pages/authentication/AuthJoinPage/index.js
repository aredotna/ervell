import React, { Component } from 'react';

import CenteringBox from 'react/components/UI/CenteringBox';
import AuthJoinForm from 'react/components/AuthJoinForm';

export default class AuthJoinPage extends Component {
  render() {
    return (
      <CenteringBox p={7}>
        <AuthJoinForm />
      </CenteringBox>
    );
  }
}
