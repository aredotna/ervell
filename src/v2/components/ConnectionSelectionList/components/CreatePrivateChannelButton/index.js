import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import createPrivateChannelMutation from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton/mutations/createPrivateChannel';

import ColoredChannelSpan from 'v2/components/UI/ColoredChannelSpan';
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton';

class CreatePrivateChannelButton extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    createPrivateChannel: PropTypes.func.isRequired,
    onConnectionCreation: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.mode === 'done' && prevState.createdTitle !== null && nextProps.title !== prevState.createdTitle) {
      return { mode: 'resting', createdTitle: null };
    }
    return null;
  }

  state = {
    mode: 'resting',
    createdTitle: null,
  }

  createPrivateChannel = () => {
    const {
      title,
      createPrivateChannel,
      onConnectionCreation,
    } = this.props;

    this.setState({ mode: 'creating' });

    createPrivateChannel({ variables: { title } })
      .then(({ data: { create_channel: { channel: newChannel } } }) => {
        this.setState({ mode: 'connecting' });
        return onConnectionCreation(true, newChannel.id);
      })
      .then(() => {
        this.setState({ mode: 'done', createdTitle: title });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ mode: 'error' });
      });
  }

  render() {
    const { mode, createdTitle } = this.state;
    const { title } = this.props;

    return (
      <ListButton onClick={this.createPrivateChannel}>
        <ColoredChannelSpan visibility="private">
          {{
            resting: `+ New private channel “${title}”`,
            creating: `Creating ${title}...`,
            connecting: `Connecting ${title}...`,
            done: `Created and connected to ${createdTitle} ✔`,
            error: 'An error occurred',
          }[mode]}
        </ColoredChannelSpan>
      </ListButton>
    );
  }
}

export default graphql(createPrivateChannelMutation, {
  name: 'createPrivateChannel',
})(CreatePrivateChannelButton);
