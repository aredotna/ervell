import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import GenericButton from 'react/components/UI/GenericButton';

import initiateChannelTransferMutation from 'react/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults/components/InitiateChannelTransferButton/mutations/initiateChannelTransfer';

import { track, en } from 'lib/analytics.coffee';

const Button = styled(GenericButton).attrs({
  f: 1,
})`
  align-self: center;
`;

class InitiateChannelTransferButton extends Component {
  static propTypes = {
    channel_id: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    initiateChannelTransfer: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const {
      channel_id,
      user_id,
      initiateChannelTransfer,
    } = this.props;

    this.setState({ mode: 'giving' });

    return initiateChannelTransfer({
      variables: { channel_id, user_id },
    })
      .then(() =>
        track.submit(en.STARTED_CHANNEL_TRANSFER, { channel_id, user_id }))

      .catch((err) => {
        console.error(err);

        this.setState({ mode: 'error' });
      });
  }

  render() {
    const { mode } = this.state;

    return (
      <Button onClick={this.handleClick}>
        {{
          resting: 'Give',
          giving: 'Sending...',
          error: 'An error occurred',
        }[mode]}
      </Button>
    );
  }
}

export default graphql(initiateChannelTransferMutation, {
  name: 'initiateChannelTransfer',
})(InitiateChannelTransferButton);
