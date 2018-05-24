import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import Styles from 'react/styles';

import OptionLink, { optionLinkPadding } from 'react/components/UI/OptionLink';

import deleteChannelMutation from 'react/components/ManageChannel/components/DeleteChannel/mutations/deleteChannel';

const Alert = styled.div`
  color: ${Styles.Colors.state.alert};
`;

const Message = styled.div`
  padding: ${optionLinkPadding};
  font-size: ${Styles.Type.size.xs};
  text-align: left;
`;

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
        <OptionLink size="xs" onClick={this.pendDeleteChannel}>
          Delete channel
        </OptionLink>

        {mode === 'error' &&
          <Alert>
            <Message>
              An error has occurred. Try again.
            </Message>
          </Alert>
        }

        {mode === 'deleting' &&
          <Alert>
            <Message>
              Deleting...
            </Message>
          </Alert>
        }

        {mode === 'pending' &&
          <Alert>
            <Message>
              Are you sure? This action cannot be undone.
            </Message>

            <OptionLink size="xs" onClick={this.deleteChannel}>
              Yes
            </OptionLink>

            <OptionLink size="xs" onClick={this.cancelDeleteChannel}>
              No
            </OptionLink>
          </Alert>
        }
      </div>
    );
  }
}

export default graphql(deleteChannelMutation, {
  name: 'deleteChannel',
})(DeleteChannel);
