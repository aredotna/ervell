import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'react/styles/theme';

import Specimen from 'react/stories/__components__/Specimen';
import States from 'react/stories/__components__/States';

import { Input } from 'react/components/UI/Inputs';

storiesOf('Input', module)
  .add('Input', () => (
    <States states={[{}, { disabled: true }, { focus: true }, { value: 'With value', focus: true }]}>
      <Input placeholder="An input" />
    </States>
  ))
  .add('Input - sizes', () => (
    <div>
      {theme.fontSizes.map((size, i) => (
        <Specimen>
          <Input f={i} placeholder={`An input @ ${size}: f={${i}}`} />
        </Specimen>
      ))}
    </div>
  ))
  .add('Input - with Errors', () => (
    <Input
      placeholder="An input"
      defaultValue="Erroneous input"
      errorMessage="This can't be blank"
    />
  ));
