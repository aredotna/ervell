import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import OptionLink, { optionLinkPadding } from 'react/components/UI/OptionLink';
import GenericButton from 'react/components/UI/GenericButton';

import deleteChannelMutation from 'react/components/ManageChannel/components/DeleteChannel/mutations/deleteChannel';

const Alert = styled.div`
  color: ${x => x.theme.colors.state.alert};
`;

const Message = styled.div`
  padding: ${optionLinkPadding};
  font-size: ${x => x.theme.fontSizesIndexed.xs};
  text-align: left;
`;

const Options = styled.div`
  margin: 0.5em 0;
  padding: ${optionLinkPadding};
`;

const Option = styled(GenericButton).attrs({
  minWidth: '6em',
  f: 1,
  color: 'state.alert',
})`
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
        <OptionLink f={1} onClick={this.pendDeleteChannel}>
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

            <Options>
              <Option onClick={this.deleteChannel}>
                Delete
              </Option>

              {' '}

              <Option onClick={this.cancelDeleteChannel}>
                Cancel
              </Option>
            </Options>
          </Alert>
        }
      </div>
    );
  }
}

export default graphql(deleteChannelMutation, {
  name: 'deleteChannel',
})(DeleteChannel);
