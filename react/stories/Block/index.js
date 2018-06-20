import React from 'react';
import { storiesOf } from '@storybook/react';
import AddBlock from 'react/components/AddBlock';

storiesOf('Block', module)
  .add('Add block', () => (
    <AddBlock />
  ));
