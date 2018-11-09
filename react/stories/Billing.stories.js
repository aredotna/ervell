import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';

import BillingForm from 'react/components/BillingForm';

storiesOf('Billing', module)
  .add('BillingForm', () => (
    <Specimen>
      <BillingForm />
    </Specimen>
  ));
