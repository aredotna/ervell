import React from 'react';
import { storiesOf } from '@storybook/react';

import Count from 'react/components/UI/Count';

storiesOf('Count', module)
  .add('default', () => (
    <div>
      <Count amount={0} label="widget" />
      <br />
      <Count amount={1} label="widget" />
      <br />
      <Count amount={99} label="widget" />
    </div>
  ));
