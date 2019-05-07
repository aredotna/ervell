import React from 'react'
import { storiesOf } from '@storybook/react'

import theme from 'v2/styles/theme'

import Specimen from 'v2/stories/__components__/Specimen'
import States from 'v2/stories/__components__/States'

import GenericButton from 'v2/components/UI/GenericButton'
import { DividerButton, FilledButton } from 'v2/components/UI/Buttons'

storiesOf('Button', module)
  .add('GenericButton', () => (
    <States
      states={[{}, { disabled: true }, { hover: true }, { active: true }]}
    >
      <GenericButton>Button</GenericButton>
    </States>
  ))
  .add('GenericButton - colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States
          key={color}
          states={[{}, { disabled: true }, { hover: true }, { active: true }]}
        >
          <GenericButton color={color}>{color}</GenericButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('GenericButton - sizes', () => (
    <Specimen>
      {theme.fontSizes.map((size, i) => (
        <States
          key={size}
          states={[{}, { disabled: true }, { hover: true }, { active: true }]}
        >
          <GenericButton f={i}>{`f={${i}}`}</GenericButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('GenericButton - minWidth', () => (
    <Specimen>
      <GenericButton minWidth="7em">Yes</GenericButton>{' '}
      <GenericButton minWidth="7em">No</GenericButton>{' '}
      <GenericButton minWidth="7em">Maybe</GenericButton>
    </Specimen>
  ))
  .add('GenericButton - dark backgrounds', () => (
    <Specimen>
      <States
        bg="white"
        states={[{}, { disabled: true }, { hover: true }, { active: true }]}
      >
        <GenericButton>Submit</GenericButton>
      </States>

      <States
        bg="state.premium"
        states={[{}, { disabled: true }, { hover: true }, { active: true }]}
      >
        <GenericButton color="white">Submit</GenericButton>
      </States>
    </Specimen>
  ))
  .add('DividerButton', () => (
    <States
      states={[{}, { disabled: true }, { hover: true }, { active: true }]}
    >
      <DividerButton>Submit</DividerButton>
    </States>
  ))
  .add('DividerButton - colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States
          key={color}
          states={[{}, { disabled: true }, { hover: true }, { active: true }]}
        >
          <DividerButton color={color}>{color}</DividerButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('DividerButton - sizes', () => (
    <Specimen>
      {theme.fontSizes.map((size, i) => (
        <States
          key={size}
          states={[{}, { disabled: true }, { hover: true }, { active: true }]}
        >
          <DividerButton f={i}>{`f={${i}}`}</DividerButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('FilledButton', () => (
    <States
      bg="gray.regular"
      states={[{}, { disabled: true }, { hover: true }, { active: true }]}
    >
      <FilledButton>Button</FilledButton>
    </States>
  ))
  .add('FilledButton - colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States
          key={color}
          states={[{}, { disabled: true }, { hover: true }, { active: true }]}
        >
          <FilledButton color={color}>{color}</FilledButton>
        </States>
      ))}
    </Specimen>
  ))
  .add('FilledButton - sizes', () => (
    <Specimen>
      {theme.fontSizes.map((size, i) => (
        <States
          bg="gray.regular"
          key={size}
          states={[{}, { disabled: true }, { hover: true }, { active: true }]}
        >
          <FilledButton f={i}>{`f={${i}}`}</FilledButton>
        </States>
      ))}
    </Specimen>
  ))
