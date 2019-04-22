import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';

import ConnectionSelection from 'react/components/ConnectionSelection';

storiesOf('Connect', module)
  .add('ConnectionSelection', () => (
    <Specimen>
      <ConnectionSelection id={999} type="BLOCK" />
    </Specimen>
  ));
