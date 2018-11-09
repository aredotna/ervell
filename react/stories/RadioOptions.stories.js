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
            <div>
              <Text f={4} mb={3} selected={selected}>
                <strong>Basic {selected && '✔'}</strong>
              </Text>
            </div>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="yearly">
          {({ selected }) => (
            <div>
              <Text f={4} mb={3} selected={selected}>
                <strong>Yearly Premium {selected && '✔'}</strong>
              </Text>
            </div>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="monthly">
          {({ selected }) => (
            <div>
              <Text f={4} mb={3} selected={selected}>
                <strong>Monthly Premium {selected && '✔'}</strong>
              </Text>
            </div>
          )}
        </RadioOptions.Option>
      </RadioOptions>
    </Specimen>
  ));
