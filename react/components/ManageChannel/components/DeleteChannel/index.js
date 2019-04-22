import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';

import deleteChannelMutation from 'react/components/ManageChannel/components/DeleteChannel/mutations/deleteChannel';

class DeleteChannel extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    deleteChannel: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  pendDeleteChannel = () => {
    this.setState({ mode: 'pending' });
  }

  deleteChannel = () => {
    const { mode } = this.state;

    if (mode !== 'pending') return null;

    const { id, deleteChannel } = this.props;

    this.setState({ mode: 'deleting' });

    return deleteChannel({
      variables: { id },
    })
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        console.error(err);
        // TODO: Better error handling
        this.setState({ mode: 'error' });
      });
  }

  cancelDeleteChannel = () => {
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;

    return (
      <div>
        <Text f={2} fontWeight="bold" color="state.alert">
          <a role="button" tabIndex={0} onClick={this.pendDeleteChannel}>
            Delete channel
          </a>
        </Text>

        {mode !== 'resting' &&
          <Box my={3}>
            {mode === 'error' &&
              <Text mb={6} f={2} color="state.alert">
                An error has occurred. Try again.
              </Text>
            }

            {mode === 'deleting' &&
              <Text mb={6} f={2} color="state.alert">
                Deleting...
              </Text>
            }

            {mode === 'pending' &&
              <div>
                <Text mb={6} f={2} color="state.alert">
                  Are you sure? This action cannot be undone.
                </Text>

                <div>
                  <GenericButton
                    f={2}
                    minWidth="6em"
                    color="state.alert"
                    onClick={this.deleteChannel}
                  >
                    Delete
                  </GenericButton>

                  {' '}

                  <GenericButton
                    f={2}
                    minWidth="6em"
                    color="state.alert"
                    onClick={this.cancelDeleteChannel}
                  >
                    Cancel
                  </GenericButton>
                </div>
              </div>
            }
          </Box>
        }
      </div>
    );
  }
}

export default graphql(deleteChannelMutation, {
  name: 'deleteChannel',
})(DeleteChannel);
