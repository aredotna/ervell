import React from 'react';
import { storiesOf } from '@storybook/react';
import { map } from 'underscore';

import styles from 'react/styles';

import HorizontalRule from 'react/components/UI/HorizontalRule';
import ColorSwatch from 'react/stories/components/ColorSwatch';
import TypeSpecimen from 'react/stories/components/TypeSpecimen';
import Specimen from 'react/stories/components/Specimen';

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
        <Specimen>
          <GenericInput size={key} value={`size=${key}`} />
          <GenericInput size={key} value={`size=${key} disabled`} disabled />
          <GenericInput size={key} value={`size=${key} focus`} focus />
        </Specimen>
      ))}
    </div>
  ))

  .add('GenericButton', () => (
    <div>
      <Specimen>
        <GenericButton>Press Me</GenericButton>
      </Specimen>

      <Specimen>
        <GenericButton minWidth="8em">One</GenericButton>
        {' '}
        <GenericButton minWidth="8em">Two</GenericButton>
        {' '}
        <GenericButton minWidth="8em">Three</GenericButton>
      </Specimen>

      <Specimen>
        <GenericButton minWidth="4em" size="xs" color="state.alert">
          Yes
        </GenericButton>
        {' '}
        <GenericButton minWidth="4em" size="xs" color="state.alert">
          No
        </GenericButton>
      </Specimen>
    </div>
  ))

  .add('GenericButton/Sizes', () => (
    <div>
      {Object.keys(styles.Type.size).map(key => (
        <Specimen>
          <GenericButton size={key}>size={key}</GenericButton>
          <GenericButton size={key} disabled>size={key} disabled</GenericButton>
          <GenericButton size={key} active>size={key} active</GenericButton>
        </Specimen>
      ))}
    </div>
  ))

  .add('ButtonGroup', () => (
    <div>
      <Specimen>
        <ButtonGroup>
          <GenericButton>Option 1</GenericButton>
          <GenericButton>Option 2</GenericButton>
          <GenericButton>Option 3</GenericButton>
          <GenericButton>Option 4</GenericButton>
        </ButtonGroup>
      </Specimen>

      <Specimen>
        <ButtonGroup>
          <GenericButton size="xs">Option 1</GenericButton>
          <GenericButton size="xs">Option 2</GenericButton>
          <GenericButton size="xs">Option 3</GenericButton>
          <GenericButton size="xs">Option 4</GenericButton>
        </ButtonGroup>
      </Specimen>

      <Specimen>
        <ButtonGroup fill>
          <GenericButton size="xs">Option 1</GenericButton>
          <GenericButton size="xs">Option 2</GenericButton>
          <GenericButton size="xs">Option 3</GenericButton>
          <GenericButton size="xs">Option 4</GenericButton>
        </ButtonGroup>
      </Specimen>

      <Specimen>
        <ButtonGroup fill>
          <GenericButton>Option 1</GenericButton>
          <GenericButton>Option 2</GenericButton>
          <GenericButton>Option 3</GenericButton>
          <GenericButton>Option 4</GenericButton>
        </ButtonGroup>
      </Specimen>
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
        <Specimen>
          <TypeSpecimen size={name} family="sans" />
          <TypeSpecimen size={name} family="serif" />
          <TypeSpecimen size={name} family="mono" />
        </Specimen>
      ))}
    </div>
  ));
