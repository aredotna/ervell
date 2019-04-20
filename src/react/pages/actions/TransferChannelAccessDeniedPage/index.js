import React, { Component } from 'react';

import Headline from 'react/pages/actions/components/Headline';
import Message from 'react/pages/actions/components/Message';
import PageContainer from 'react/components/UI/PageContainer';

export default class TransferChannelAccessDeniedPage extends Component {
  render() {
    return (
      <PageContainer>
        <Headline>
          We are unable to handle this transfer.
        </Headline>

        <Message>
          You are not authorized for this action.
          You may be logged into the incorrect account.<br />
          If you are experiencing difficulty transferring a channel,
          contact us at <a href="mailto:help@are.na">help@are.na</a>.
        </Message>
      </PageContainer>
    );
  }
}
