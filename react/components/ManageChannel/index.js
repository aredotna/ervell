import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { some } from 'underscore';
import styled from 'styled-components';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';
import manageChannelQuery from 'react/components/ManageChannel/queries/manageChannel';
import updateChannelMutation from 'react/components/ManageChannel/mutations/updateChannel';
import deleteChannelMutation from 'react/components/ManageChannel/mutations/deleteChannel';

import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea, Select } from 'react/components/UI/GenericInput';

import Styles from 'react/styles';

const Container = styled.div`
  width: 100%;
  margin: 0 auto 2em auto;
`;

const Caption = styled.div`
  margin-top: 1em;
  font-size: 0.75rem;
  text-align: center;
`;

const DeleteConfirmation = styled.div`
  color: ${Styles.Colors.state.alert};
`;

const Message = styled.div`
  margin: 0.33em 0.5em;
  font-size: 0.75rem;
  text-align: left;
`;

const SmallButton = styled.a`
  display: block;
  padding: 0.33em 0.5em;
  font-size: 0.75rem;
  font-weight: bold;
`;

class ManageChannel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      channel: propType(manageChannelFragment),
    }).isRequired,
    updateChannel: PropTypes.func.isRequired,
    deleteChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    title: '',
    description: '',
    visibility: '',
  }

  componentWillReceiveProps({ data: { channel: { title, description, visibility } } }) {
    this.setState({ title, description, visibility });
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const { data: { channel: originalChannel } } = this.props;

    const isEdited = some(originalChannel, (originalValue, key) =>
      fieldName === key && originalValue !== fieldValue);

    this.setState({
      mode: isEdited ? 'submit' : 'resting',
      [fieldName]: fieldValue,
    });
  }

  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')
  handleVisbility = this.handleInput('visibility')

  handleDeleteClick = () => {
    this.setState({ mode: 'delete' });
  }

  cancelDelete = () => {
    this.setState({ mode: 'resting' }); // Needs a better resetMode
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateChannel, deleteChannel, data: { channel: { id } },
    } = this.props;

    const {
      mode, title, description, visibility,
    } = this.state;

    switch (mode) {
      case 'resting':
        return onClose();
      case 'delete':
        this.setState({ mode: 'deleting' });

        return deleteChannel({
          variables: { id },
        })
          .then(() => {
            onClose();
            window.location = '/';
          })
          .catch((err) => {
            console.error(err);
            // TODO: Better error handling
            this.setState({ mode: 'error' });
          });
      default:
        this.setState({ mode: 'submitting' });

        return updateChannel({
          variables: {
            id, title, description, visibility,
          },
        })
          .then(({ data: { update_channel: { channel: { href } } } }) => {
            onClose();
            // Slug may have changed so redirect
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
    const { data: { loading } } = this.props;
    const {
      mode, title, description, visibility,
    } = this.state;

    if (loading) return <div />;

    return (
      <TitledDialog
        title="Edit channel"
        label={{
          resting: 'Done',
          submit: 'Save',
          submitting: 'Saving...',
          deleting: 'Deleting...',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <Container>
          <TitledDialog.Section>
            <TitledDialog.Label>
              Name
            </TitledDialog.Label>

            <Input
              name="title"
              value={title}
              onChange={this.handleTitle}
            />
          </TitledDialog.Section>

          <TitledDialog.Section>
            <TitledDialog.Label>
              Description
            </TitledDialog.Label>

            <Textarea
              name="description"
              value={description}
              onChange={this.handleDescription}
              placeholder="describe your channel here"
              rows="3"
            />
          </TitledDialog.Section>

          <TitledDialog.Section>
            <TitledDialog.Label>
              Privacy
            </TitledDialog.Label>

            <Select
              name="visibility"
              value={visibility.toUpperCase()}
              onChange={this.handleVisbility}
            >
              <option value="PUBLIC">Open</option>
              <option value="CLOSED">Closed</option>
              <option value="PRIVATE">Private</option>
            </Select>

            <Caption>
              {{
                PUBLIC: 'Everyone can view the channel and anyone logged-in can add to it.',
                CLOSED: 'Everyone can view the channel but only you and your collaborators can add to it.',
                PRIVATE: 'Only you and your collaborators can view and add to the channel.',
              }[visibility.toUpperCase()]}
            </Caption>
          </TitledDialog.Section>

          <TitledDialog.Section>
            <TitledDialog.Label>
              Delete
            </TitledDialog.Label>

            <SmallButton onClick={this.handleDeleteClick}>
              Delete channel
            </SmallButton>

            {mode === 'delete' &&
              <DeleteConfirmation>
                <Message>
                  Are you sure? This action cannot be undone.
                </Message>

                <SmallButton onClick={this.handleSubmit}>
                  Yes
                </SmallButton>

                <SmallButton onClick={this.cancelDelete}>
                  No
                </SmallButton>
              </DeleteConfirmation>
            }
          </TitledDialog.Section>
        </Container>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
  graphql(deleteChannelMutation, { name: 'deleteChannel' }),
)(ManageChannel);
