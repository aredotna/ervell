import React from 'react';
import { storiesOf } from '@storybook/react';

import { COLOR_KEYS } from 'react/styles/Colors';

import Specimen from 'react/stories/__components__/Specimen';

import GenericButton from 'react/components/UI/GenericButton';

storiesOf('Button', module)
  .add('GenericButton', () => (
    <div>
      <GenericButton>Press</GenericButton>
      {' '}
      <GenericButton disabled>Press (disabled)</GenericButton>
      {' '}
      <GenericButton active>Press (active)</GenericButton>
    </div>
  ))
  .add('GenericButton - colors', () => (
    <div>
      {COLOR_KEYS.map(color => (
        <Specimen>
          <GenericButton color={color}>{color}</GenericButton>
          {' '}
          <GenericButton color={color} disabled>{color}</GenericButton>
          {' '}
          <GenericButton color={color} active>{color}</GenericButton>
        </Specimen>
      ))}
    </div>
  ));
