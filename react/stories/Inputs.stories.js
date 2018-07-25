import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'react/styles/theme';

import Specimen from 'react/stories/__components__/Specimen';
import States from 'react/stories/__components__/States';

import GenericInput, { InputWithError } from 'react/components/UI/GenericInput';

storiesOf('Input', module)
  .add('GenericInput', () => (
    <States states={[{}, { disabled: true }, { focus: true }]}>
      <GenericInput placeholder="An input" />
    </States>
  ))
  .add('GenericInput - sizes', () => (
    <div>
      {theme.fontSizes.map((size, i) => (
        <Specimen>
          <GenericInput f={i} placeholder={`An input @ ${size}: f={${i}}`} />
        </Specimen>
      ))}
    </div>
  ))
  .add('GenericInput - with Errors', () => (
    <InputWithError placeholder="An input" error="This can't be blank" />
  ));
