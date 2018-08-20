import React, { Component } from 'react';

import { Input, Textarea, Label, Checkbox, LabelledInput } from 'react/components/UI/Inputs';
import ChannelVisibilityPulldown from 'react/components/ChannelVisibilityPulldown';

export default class NewChannelForm extends Component {
  render() {
    return (
      <div>
        <LabelledInput my={6}>
          <Label>
            Name
          </Label>

          <Input
            f={7}
            color="channel.public"
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
            width={['100%', '75%']}
            rows={4}
          />
        </LabelledInput>

        <LabelledInput my={6}>
          <Label>Privacy</Label>
          <ChannelVisibilityPulldown value="open" />
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
