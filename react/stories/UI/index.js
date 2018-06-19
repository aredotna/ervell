import React from 'react';
import { storiesOf } from '@storybook/react';
import { map } from 'underscore';

import styles from 'react/styles';

import HorizontalRule from 'react/components/UI/HorizontalRule';
import ColorSwatch from 'react/stories/components/ColorSwatch';
import TypeSpecimen from 'react/stories/components/TypeSpecimen';

import ModalDialog from 'react/components/UI/ModalDialog';
import GenericButton from 'react/components/UI/GenericButton';
import GenericInput from 'react/components/UI/GenericInput';
import ButtonGroup from 'react/components/UI/ButtonGroup';

storiesOf('UI', module)
  .add('ModalDialog', () => (
    <ModalDialog>
      <h1>Hello</h1>
    </ModalDialog>
  ))

  .add('GenericInput', () => (
    <div>
      {Object.keys(styles.Type.size).map(key => (
        <div>
          <GenericInput size={key} value={`size=${key}`} />
          <GenericInput size={key} value={`size=${key} disabled`} disabled />
          <GenericInput size={key} value={`size=${key} focus`} focus />
          <HorizontalRule invisible />
        </div>
      ))}
    </div>
  ))

  .add('GenericButton', () => (
    <div>
      {Object.keys(styles.Type.size).map(key => (
        <div>
          <GenericButton size={key}>size={key}</GenericButton>
          <GenericButton size={key} disabled>size={key} disabled</GenericButton>
          <GenericButton size={key} active>size={key} active</GenericButton>
        </div>
      ))}
    </div>
  ))

  .add('ButtonGroup', () => (
    <div>
      <ButtonGroup>
        <GenericButton>Option 1</GenericButton>
        <GenericButton>Option 2</GenericButton>
        <GenericButton>Option 3</GenericButton>
        <GenericButton>Option 4</GenericButton>
      </ButtonGroup>

      <HorizontalRule invisible />

      <ButtonGroup>
        <GenericButton size="xs">Option 1</GenericButton>
        <GenericButton size="xs">Option 2</GenericButton>
        <GenericButton size="xs">Option 3</GenericButton>
        <GenericButton size="xs">Option 4</GenericButton>
      </ButtonGroup>

      <HorizontalRule invisible />

      <ButtonGroup fill>
        <GenericButton size="xs">Option 1</GenericButton>
        <GenericButton size="xs">Option 2</GenericButton>
        <GenericButton size="xs">Option 3</GenericButton>
        <GenericButton size="xs">Option 4</GenericButton>
      </ButtonGroup>

      <HorizontalRule invisible />

      <ButtonGroup fill>
        <GenericButton>Option 1</GenericButton>
        <GenericButton>Option 2</GenericButton>
        <GenericButton>Option 3</GenericButton>
        <GenericButton>Option 4</GenericButton>
      </ButtonGroup>
    </div>
  ))

  .add('Colors', () => (
    <div>
      {map(styles.Colors, (set, name) => (
        <div>
          <h3>{name}</h3>
          {map(set, (value, color) => (
            <ColorSwatch color={value}>
              {color}: {value}
            </ColorSwatch>
          ))}
        </div>
      ))}
    </div>
  ))

  .add('Type', () => (
    <div>
      {map(styles.Type.size, (_size, name) => (
        <div>
          <TypeSpecimen size={name} family="sans" />
          <TypeSpecimen size={name} family="serif" />
          <TypeSpecimen size={name} family="mono" />
        </div>
      ))}
    </div>
  ));
