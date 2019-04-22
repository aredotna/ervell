import React, { Component } from 'react';

import Headline from 'react/pages/actions/components/Headline';
import Message from 'react/pages/actions/components/Message';
import PageContainer from 'react/components/UI/PageContainer';

export default class TransferChannelNotFoundPage extends Component {
  render() {
    return (
      <PageContainer>
        <Headline>
          We are unable to handle this transfer.
        </Headline>

        <Message>
          This token is invalid.
          It may have already been used.<br />
          If you are experiencing difficulty transferring a channel,
          contact us at <a href="mailto:help@are.na">help@are.na</a>.
        </Message>
      </PageContainer>
    );
  }
}
