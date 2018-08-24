import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'react/styles/theme';

import Specimen from 'react/stories/__components__/Specimen';
import States from 'react/stories/__components__/States';

import GenericButton from 'react/components/UI/GenericButton';
import { DividerButton } from 'react/components/UI/Buttons';

storiesOf('Button', module)
  .add('GenericButton', () => (
    <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
      <GenericButton>Button</GenericButton>
    </States>
  ))
  .add('GenericButton - colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
          <GenericButton color={color}>{color}</GenericButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('GenericButton - sizes', () => (
    <Specimen>
      {theme.fontSizes.map((size, i) => (
        <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
          <GenericButton f={i}>{`f={${i}}`}</GenericButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('GenericButton - minWidth', () => (
    <Specimen>
      <GenericButton minWidth="7em">Yes</GenericButton>
      {' '}
      <GenericButton minWidth="7em">No</GenericButton>
      {' '}
      <GenericButton minWidth="7em">Maybe</GenericButton>
    </Specimen>
  ))
  .add('DividerButton', () => (
    <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
      <DividerButton>Submit</DividerButton>
    </States>
  ))
  .add('DividerButton - colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
          <DividerButton color={color}>{color}</DividerButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('DividerButton - sizes', () => (
    <Specimen>
      {theme.fontSizes.map((size, i) => (
        <States states={[{}, { disabled: true }, { hover: true }, { active: true }]}>
          <DividerButton f={i}>{`f={${i}}`}</DividerButton>
        </States>
      ))}
    </Specimen>
  ));
