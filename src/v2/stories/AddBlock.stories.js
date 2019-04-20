import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';

import AddBlock from 'v2/components/AddBlock';

storiesOf('AddBlock', module).add('default', () => (
  <Specimen>
    <AddBlock channel_id="foobar" />
  </Specimen>
));
