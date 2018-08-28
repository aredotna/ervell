import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Text from 'react/components/UI/Text';
import { LabelledInput, Label, Input, Textarea } from 'react/components/UI/Inputs';

storiesOf('LabelledInput', module)
  .add('LabelledInput', () => (
    <Specimen>
      <LabelledInput>
        <Label>Short</Label>
        <Input placeholder="Example input" />
      </LabelledInput>

      <LabelledInput>
        <Label pt={0}>Super short</Label>
        <Text f={2} fontWeight="bold">
          <a href="#">Do something</a>
        </Text>
      </LabelledInput>

      <LabelledInput>
        <Label>Longer</Label>
        <Textarea placeholder="Example textarea" rows={9} />
      </LabelledInput>

      <LabelledInput>
        <Label>Really long label it keeps going and going</Label>
        <Textarea placeholder="Example textarea" rows={9} />
      </LabelledInput>

      <LabelledInput>
        <Label>Short</Label>
        <Input placeholder="Example input" />
      </LabelledInput>
    </Specimen>
  ));
