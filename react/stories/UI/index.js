import React from 'react';
import { storiesOf } from '@storybook/react';
import { map } from 'underscore';

import styles from 'react/styles';

import ColorSwatch from 'react/stories/__components__/ColorSwatch';
import TypeSpecimen from 'react/stories/__components__/TypeSpecimen';
import Specimen from 'react/stories/__components__/Specimen';

import ModalDialog from 'react/components/UI/ModalDialog';
import GenericButton from 'react/components/UI/GenericButton';
import GenericInput from 'react/components/UI/GenericInput';
import ButtonGroup from 'react/components/UI/ButtonGroup';
import CountdownRedirect from 'react/components/UI/CountdownRedirect';
import Type from 'react/components/UI/Type';

storiesOf('UI', module)
  .add('CountdownRedirect', () => (
    <CountdownRedirect length={15} href="https://google.com" debug />
  ))

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
        <ButtonGroup stretch>
          <GenericButton size="xs">Option 1</GenericButton>
          <GenericButton size="xs">Option 2</GenericButton>
          <GenericButton size="xs">Option 3</GenericButton>
          <GenericButton size="xs">Option 4</GenericButton>
        </ButtonGroup>
      </Specimen>

      <Specimen>
        <ButtonGroup stretch>
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
    <Specimen>
      <Type size="h1">A Headline</Type>
      <Type size="h2">Now a sub-headline</Type>

      <Type size="base">
        Except that Bayard demonstrates how, when someone talks about a book he or she hasn’t read,
        even those who have read it don’t realize what he or she has said about it is wrong.
        Toward the end of his book, he admits he has introduced three false pieces of information
        in his summaries of The Name of the Rose, Graham Greene’s The Third Man,
        and David Lodge’s Changing Places. The amusing thing is that, when I read them,
        I immediately noticed the error regarding Graham Greene, was doubtful about David Lodge,
        but didn’t notice the error in my own book. This probably means that I didn’t read Bayard’s book properly,
        or alternatively, and both he and my readers would be entitled to suspect this,
        that I merely skimmed through it. But the most interesting thing is that Bayard has failed to notice that,
        in admitting his three intentional errors, he implicitly assumes that one way of reading is more correct than others,
        so that he carries out a meticulous study of the books he quotes in order to support his theory about not reading them.
        The contradiction is so apparent that it makes one wonder whether Bayard has actually read the book he’s written.
      </Type>
    </Specimen>
  ))

  .add('Type/Sizes', () => (
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
