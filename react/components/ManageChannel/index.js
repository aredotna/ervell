import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { some } from 'underscore';
import styled from 'styled-components';

import mapErrors from 'react/util/mapErrors';
import compactObject from 'react/util/compactObject';

import manageChannelFragment from 'react/components/ManageChannel/fragments/manageChannel';
import manageChannelQuery from 'react/components/ManageChannel/queries/manageChannel';
import updateChannelMutation from 'react/components/ManageChannel/mutations/updateChannel';

import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import TitledDialog from 'react/components/UI/TitledDialog';
import Text from 'react/components/UI/Text';
import { LabelledInput, Label, Input, Textarea, Select, ErrorMessage } from 'react/components/UI/Inputs';
import ExportChannel from 'react/components/ManageChannel/components/ExportChannel';
import DeleteChannel from 'react/components/ManageChannel/components/DeleteChannel';
import TransferChannel from 'react/components/ManageChannel/components/TransferChannel';

const Container = styled.div`
  width: 100%;
  margin: 0 auto 2em auto;
`;

class ManageChannel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(manageChannelFragment),
    }).isRequired,
    updateChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    title: null,
    description: null,
    visibility: null,
    attributeErrors: {},
    errorMessage: '',
  };

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

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      onClose, updateChannel, data: { channel: { id } },
    } = this.props;

    const {
      mode, title, description, visibility,
    } = this.state;

    if (mode === 'resting') return onClose();

    this.setState({ mode: 'submitting' });

    const variables = compactObject({
      id, title, description, visibility,
    });

    return updateChannel({ variables })
      .then(({ data: { update_channel: { channel: { href } } } }) => {
        onClose();
        // Slug may have changed so redirect
        window.location = href;
      })
      .catch((err) => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  render() {
    const { data: { loading } } = this.props;
    const {
      mode,
      visibility,
      attributeErrors,
      errorMessage,
    } = this.state;

    if (loading) return <LoadingIndicator />;

    const { data: { channel } } = this.props;

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
          <LabelledInput>
            <Label>Name</Label>

            <Input
              name="title"
              defaultValue={channel.title}
              onChange={this.handleTitle}
              errorMessage={attributeErrors.title}
              required
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Description
            </Label>

            <Textarea
              name="description"
              defaultValue={channel.description}
              onChange={this.handleDescription}
              placeholder="describe your channel here"
              rows="3"
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Privacy
            </Label>

            <div>
              <Select
                name="visibility"
                defaultValue={channel.visibility.toUpperCase()}
                onChange={this.handleVisbility}
              >
                <option value="PUBLIC">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="PRIVATE">Private</option>
              </Select>

              <Text mt={6} f={1} textAlign="center">
                {{
                  PUBLIC: 'Everyone can view the channel and anyone logged-in can add to it.',
                  CLOSED: 'Everyone can view the channel but only you and your collaborators can add to it.',
                  PRIVATE: 'Only you and your collaborators can view and add to the channel.',
                }[(visibility || channel.visibility).toUpperCase()]}
              </Text>
            </div>
          </LabelledInput>

          {channel.can.export &&
            <LabelledInput>
              <Label>
                Export
              </Label>

              <ExportChannel id={channel.id} />
            </LabelledInput>
          }

          {channel.can.transfer &&
            <LabelledInput>
              <Label>
                Transfer
              </Label>

              <TransferChannel channel={channel} />
            </LabelledInput>
          }

          {channel.can.destroy &&
            <LabelledInput>
              <Label pt={0}>
                Delete
              </Label>

              <DeleteChannel id={channel.id} />
            </LabelledInput>
          }

          {mode === 'error' &&
            <ErrorMessage my={5} align="center">
              {errorMessage}
            </ErrorMessage>
          }
        </Container>
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' }),
)(ManageChannel);
