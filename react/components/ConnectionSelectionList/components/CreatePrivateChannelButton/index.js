import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import recentChannelsQuery from 'react/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels';

import createPrivateChannelMutation from 'react/components/ConnectionSelectionList/components/CreatePrivateChannelButton/mutations/createPrivateChannel';

import ColoredChannelSpan from 'react/components/UI/ColoredChannelSpan';
import ListButton from 'react/components/ConnectionSelectionList/components/ListButton';

class CreatePrivateChannelButton extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    createPrivateChannel: PropTypes.func.isRequired,
    onConnectionCreation: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  createPrivateChannel = async () => {
    const {
      title,
      createPrivateChannel,
      onConnectionCreation,
    } = this.props;

    this.setState({ mode: 'creating' });

    const refetchQueries = [
      {
        query: recentChannelsQuery,
      },
    ];

    try {
      const {
        data: {
          create_channel: {
            channel: {
              id: newChannelId,
            },
          },
        },
      } = await createPrivateChannel({
        refetchQueries,
        variables: { title },
      });

      this.setState({ mode: 'resting' });

      return onConnectionCreation(true, newChannelId);
    } catch (err) {
      console.error(err);

      this.setState({ mode: 'error' });

      return null;
    }
  }

  render() {
    const { mode } = this.state;
    const { title } = this.props;

    return (
      <ListButton onClick={this.createPrivateChannel}>
        <ColoredChannelSpan visibility="private">
          {{
            resting: `+ New private channel “${title}”`,
            creating: `Creating ${title}...`,
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
