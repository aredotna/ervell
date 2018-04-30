import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';
import manageChannelQuery from 'react/components/ManageChannel/queries/manageChannel';
import updateChannelMutation from 'react/components/ManageChannel/mutations/updateChannel';

import TitledDialog from 'react/components/UI/TitledDialog';
import GenericInput from 'react/components/UI/GenericInput';

class ManageChannel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      channel: propType(manageChannelFragment),
    }).isRequired,
    updateChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    title: '',
  }

  componentWillReceiveProps({ data: { channel: { title } } }) {
    this.setState({ title });
  }

  handleTitle = ({ target: { value: title } }) => {
    const { data: { channel: { title: originalName } } } = this.props;
    const isEdited = title !== originalName;

    this.setState({
      title,
      mode: isEdited ? 'submit' : 'resting',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateChannel, data: { channel: { id } },
    } = this.props;

    const { mode, title } = this.state;

    switch (mode) {
      case 'resting':
        return onClose();
      default:
        this.setState({ mode: 'submitting' });

        return updateChannel({
          variables: { id, title },
        })
          .then(({ data: { update_channel: { channel: { href } } } }) => {
            onClose();
            window.location = href;
          })
          .catch((err) => {
            console.error(err);
            // TODO: Better error handling
            this.setState({ mode: 'error' });
          });
    }
  }

  render() {
    const { mode, title } = this.state;
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    return (
      <TitledDialog
        title="Edit channel"
        label={{
          resting: 'Done',
          submit: 'Save',
          submitting: 'Saving...',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <TitledDialog.Section>
          <TitledDialog.Label>
            Name
          </TitledDialog.Label>

          <GenericInput value={title} onChange={this.handleTitle} />
        </TitledDialog.Section>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(ManageChannel);
