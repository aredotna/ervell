import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Count from 'react/components/UI/Count';

storiesOf('Count', module)
  .add('default', () => (
    <Specimen>
      <Count amount={0} label="widget" />
      <br />
      <Count amount={1} label="widget" />
      <br />
      <Count amount={99} label="widget" />
    </Specimen>
  ));
