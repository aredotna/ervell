import React from 'react';
import { storiesOf } from '@storybook/react';
import { lorem } from 'faker';

import Tabs from 'react/components/UI/Tabs';
import Text from 'react/components/UI/Text';

storiesOf('Tabs', module)
  .add('default', () => (
    <Tabs>
      <div label="Section A">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>

      <div label="Section B">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>

      <div label="Section C">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>

      <div label="Section D">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>
    </Tabs>
  )).add('with inital active tab set', () => (
    <Tabs activeTab="Section D">
      <div label="Section A">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>

      <div label="Section B">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>

      <div label="Section C">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>

      <div label="Section D">
        <Text p={2}>{lorem.paragraphs()}</Text>
      </div>
    </Tabs>
  ));
