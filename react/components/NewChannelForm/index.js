import React, { Component } from 'react';

import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea, Label, LabelledCheckbox, LabelledInput } from 'react/components/UI/Inputs';
import ChannelVisibilityPulldown from 'react/components/ChannelVisibilityPulldown';

export default class NewChannelForm extends Component {
  state = {
    mode: 'resting',
    title: '',
    description: '',
    visibility: 'open',
    visit_channel: false,
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) =>
    this.setState(prevState => ({
      [fieldName]: fieldValue,
      mode: 'active',
      attributeErrors: {
        ...prevState.attributeErrors,
        [fieldName]: null, // Clear specific error once typing begins
      },
    }));

  handleCheckbox = fieldName => ({ target: { checked } }) =>
    this.setState({ [fieldName]: checked })
      type='checkbox'

  handleVisitChannel = this.handleCheckbox('visit_channel')
  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')

  handleVisibility = visibility =>
    this.setState({ visibility });

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  render() {
    const {
      mode,
      title,
      description,
      visibility,
      visit_channel,
    } = this.state;

    return (
      <TitledDialog
        title="New channel"
        label={{
          resting: 'Create',
          submit: 'Create',
          submitting: 'Creating...',
          error: 'Error',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <LabelledInput mt={6} mb={7}>
          <Label>
            Name
          </Label>

          <Input
            f={7}
            color={`channel.${visibility}`}
            placeholder="Type channel name"
            borderless
            autoFocus
            required
            value={title}
            onChange={this.handleTitle}
          />
        </LabelledInput>

        <LabelledInput my={6} alignItems="start">
          <Label>
            Description
          </Label>

          <Textarea
            placeholder="Describe your channel here"
            rows={4}
            value={description}
            onChange={this.handleDescription}
          />
        </LabelledInput>

        <LabelledInput my={6} alignItems="start">
          <Label>Privacy</Label>
          <ChannelVisibilityPulldown
            value="open"
            onChange={this.handleVisibility}
          />
        </LabelledInput>

        <LabelledInput mt={6} mb={8}>
          <Label />
          <LabelledCheckbox
            onChange={this.handleVisitChannel}
            checked={visit_channel}
          >
            Visit channel
          </LabelledCheckbox>
        </LabelledInput>
      </TitledDialog>
    );
  }
}
