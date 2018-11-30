import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';

import Billing from 'react/components/Billing';
import PrivateBlocksMeter from 'react/components/PrivateBlocksMeter';

storiesOf('Billing', module)
  .add('Billing', () => (
    <Specimen>
      <Billing />
    </Specimen>
  ))
  .add('PrivateBlocksMeter', () => (
    <Specimen>
      <PrivateBlocksMeter
        me={{ counts: { private_connections: 66 } }}
      />
    </Specimen>
  ));
