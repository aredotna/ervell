import React, { Component } from 'react';

import Headline from 'react/pages/actions/components/Headline';
import PageContainer from 'react/components/UI/PageContainer';

export default class ConnectTwitterPage extends Component {
  render() {
    return (
      <PageContainer>
        <Headline>
          You aren&apos;t following anyone yet.<br />
          Do you want to search your Twitter contacts to find friends on Are.na?
        </Headline>
      </PageContainer>
    );
  }
}
