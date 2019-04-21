import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Headline from 'v2/pages/actions/components/Headline';
import Message from 'v2/pages/actions/components/Message';
import PageContainer from 'v2/components/UI/PageContainer';
import CountdownRedirect from 'v2/components/UI/CountdownRedirect';

import { track, en } from 'lib/analytics.coffee';

export default class TransferChannelRejectedPage extends Component {
  static propTypes = {
    channel: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const {
      channel: { id: channel_id },
    } = this.props;
    track.submit(en.REJECTED_CHANNEL_TRANSFER, { channel_id });
  }

  render() {
    const { channel } = this.props;

    return (
      <PageContainer>
        <Headline>Transfer Rejected</Headline>

        <Message>
          The request to transfer “<a href={channel.href}>{channel.title}</a>”
          has been rejected.
          <CountdownRedirect length={10} href="/" />
        </Message>
      </PageContainer>
    );
  }
}
