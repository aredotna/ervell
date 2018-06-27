import React from 'react';
import { storiesOf } from '@storybook/react';

import GenericButton from 'react/components/UI/GenericButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

storiesOf('ButtonGroup', module)
  .add('default', () => (
    <ButtonGroup>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('default - two options', () => (
    <ButtonGroup>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
    </ButtonGroup>
  ))
  .add('default - small buttons', () => (
    <ButtonGroup>
      <GenericButton f={1}>Option 1</GenericButton>
      <GenericButton f={1}>Option 2</GenericButton>
      <GenericButton f={1}>Option 3</GenericButton>
      <GenericButton f={1}>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('default - colors', () => (
    <ButtonGroup>
      <GenericButton color="state.alert">Option 1</GenericButton>
      <GenericButton color="state.alert">Option 2</GenericButton>
      <GenericButton color="state.alert">Option 3</GenericButton>
      <GenericButton color="state.alert">Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('stretch', () => (
    <ButtonGroup stretch>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('stretch - small buttons', () => (
    <ButtonGroup stretch>
      <GenericButton f={1}>Option 1</GenericButton>
      <GenericButton f={1}>Option 2</GenericButton>
      <GenericButton f={1}>Option 3</GenericButton>
      <GenericButton f={1}>Option 4</GenericButton>
    </ButtonGroup>
  ));
