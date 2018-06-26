import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'react/styles/theme';

import Specimen from 'react/stories/__components__/Specimen';
import States from 'react/stories/__components__/States';

import GenericButton from 'react/components/UI/GenericButton';

storiesOf('Button', module)
  .add('GenericButton', () => (
    <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
      <GenericButton>Press</GenericButton>
    </States>
  ))
  .add('GenericButton - colors', () => (
    <div>
      {theme.meta.colorNames.map(color => (
        <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
          <GenericButton color={color}>{color}</GenericButton>
        </States>
      ))}
    </div>
  ))
  .add('GenericButton - sizes', () => (
    <div>
      {theme.fontSizes.map((size, i) => (
        <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
          <GenericButton f={size}>{`f={${i}}`}</GenericButton>
        </States>
      ))}
    </div>
  ))
  .add('GenericButton - minWidth', () => (
    <div>
      <GenericButton minWidth="7em">Yes</GenericButton>
      {' '}
      <GenericButton minWidth="7em">No</GenericButton>
      {' '}
      <GenericButton minWidth="7em">Maybe</GenericButton>
    </div>
  ));
