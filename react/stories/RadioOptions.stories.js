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
                <strong>Basic</strong>
              </Text>

              <Text f={1} color="gray.medium">
                Basic members are limited to 100 private blocks.
              </Text>
            </div>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="yearly">
          {({ selected }) => (
            <div>
              <Text f={4} mb={3} selected={selected}>
                <strong>Yearly Premium</strong>
              </Text>

              <Text f={1} color="gray.medium">
                Upload unlimited private blocks, hide from search engines,{' '}
                and get early access to new products and features.
              </Text>
            </div>
          )}
        </RadioOptions.Option>

        <RadioOptions.Option value="monthly">
          {({ selected }) => (
            <div>
              <Text f={4} mb={3} selected={selected}>
                <strong>Monthly Premium</strong>
              </Text>

              <Text f={1} color="gray.medium">
                Selected members can upload unlimited blocks,{' '}
                hide from search engines, and gain access to new features.
              </Text>
            </div>
          )}
        </RadioOptions.Option>
      </RadioOptions>
    </Specimen>
  ));
