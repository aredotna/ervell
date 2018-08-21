import React, { Component } from 'react';

import { Input, Textarea, Label, Checkbox, LabelledInput } from 'react/components/UI/Inputs';
import ChannelVisibilityPulldown from 'react/components/ChannelVisibilityPulldown';

export default class NewChannelForm extends Component {
  state = {
    title: '',
    description: '',
    visibility: 'open',
    visit_channel: false,
  }

  handleVisibility = visibility =>
    this.setState({ visibility });

  render() {
    const {
      title, description, visibility, visit_channel,
    } = this.state;

    return (
      <div>
        <LabelledInput my={6}>
          <Label>
            Name
          </Label>

          <Input
            f={7}
            color={`channel.${visibility}`}
            placeholder="Type channel name"
            borderless
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

        <LabelledInput my={6}>
          <Label>Privacy</Label>
          <ChannelVisibilityPulldown value="open" onChange={this.handleVisibility} />
        </LabelledInput>

        <LabelledInput my={6}>
          <div />
          <Label>
            <Checkbox />
            Visit channel
          </Label>
        </LabelledInput>
      </div>
    );
  }
}
