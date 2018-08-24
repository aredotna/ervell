import React, { Component } from 'react';

import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea, Label, Checkbox, LabelledInput } from 'react/components/UI/Inputs';
import ChannelVisibilityPulldown from 'react/components/ChannelVisibilityPulldown';


export default class NewChannelForm extends Component {
  state = {
    mode: 'resting',
    // title: '',
    // description: '',
    visibility: 'open',
    // visit_channel: false,
  }

  handleVisibility = visibility =>
    this.setState({ visibility });

  render() {
    const {
      mode,
      visibility,
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
          />
        </LabelledInput>

        <LabelledInput my={6} alignItems="start">
          <Label>
            Description
          </Label>

          <Textarea
            placeholder="Describe your channel here"
            rows={4}
          />
        </LabelledInput>

        <LabelledInput my={6} alignItems="start">
          <Label>Privacy</Label>
          <ChannelVisibilityPulldown value="open" onChange={this.handleVisibility} />
        </LabelledInput>

        <LabelledInput mt={6} mb={8}>
          <div />
          <Label>
            <Checkbox />
            Visit channel
          </Label>
        </LabelledInput>
      </TitledDialog>
    );
  }
}
