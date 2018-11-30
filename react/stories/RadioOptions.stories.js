import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';

import RadioOptions from 'react/components/UI/RadioOptions';
import Text from 'react/components/UI/Text';

storiesOf('RadioOptions', module)
  .add('default', () => (
    <Specimen>
      <RadioOptions value="basic" onSelect={action('onSelect')}>
        <RadioOptions.Option value="basic">
          {({ selected }) => (
            <Text f={4} mb={3} selected={selected}>
              <strong>Basic {JSON.stringify({ selected })}</strong>
            </Text>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="yearly">
          {({ selected }) => (
            <Text f={4} mb={3} selected={selected}>
              <strong>Yearly Premium {JSON.stringify({ selected })}</strong>
            </Text>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="monthly">
          {({ selected }) => (
            <Text f={4} mb={3} selected={selected}>
              <strong>Monthly Premium {JSON.stringify({ selected })}</strong>
            </Text>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="lifetime" disabled>
          {({ selected }) => (
            <Text f={4} mb={3} selected={selected}>
              <strong>Lifetime Premium (disabled) {JSON.stringify({ selected })}</strong>
            </Text>
          )}
        </RadioOptions.Option>
      </RadioOptions>
    </Specimen>
  ))
  .add('sizing', () => (
    <Specimen>
      <RadioOptions value="basic" onSelect={action('onSelect')} size="1em">
        <RadioOptions.Option value="one">
          {() => 'One'}
        </RadioOptions.Option>

        <RadioOptions.Option value="two">
          {() => 'Two'}
        </RadioOptions.Option>

        <RadioOptions.Option value="three">
          {() => 'Three'}
        </RadioOptions.Option>
      </RadioOptions>
    </Specimen>
  ));
