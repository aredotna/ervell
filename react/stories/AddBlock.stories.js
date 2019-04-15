import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';

import AddBlock from 'react/components/AddBlock';

storiesOf('AddBlock', module)
  .add('default', () => (
    <Specimen>
      <AddBlock channel_id="foobar" />
    </Specimen>
  ));
