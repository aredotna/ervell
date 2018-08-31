import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Box from 'react/components/UI/Box';
import ModalDialog from 'react/components/UI/ModalDialog';
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
  ))
  .add('LabelledInput - tight vertical space', () => (
    <Specimen>
      <Box border="1px dashed red" width="75%" height="400px">
        <ModalDialog>
          <div>
            Must be wrapped in some non-flex element to prevent flex-shrink
            from killing vertical space. We still want collapsing margins so
            `flex-shrink: 0` should not apply.

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
          </div>
        </ModalDialog>
      </Box>
    </Specimen>
  ));
