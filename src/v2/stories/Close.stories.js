import React from 'react';
import { storiesOf } from '@storybook/react';

import States from 'v2/stories/__components__/States';
import Specimen from 'v2/stories/__components__/Specimen';

import Close from 'v2/components/UI/Close';

storiesOf('Close', module).add('default', () => (
  <Specimen>
    <States
      bg="gray.medium"
      states={[
        { size: 6 },
        {
          size: 7,
          color: 'white',
          thickness: '4px',
        },
        {
          size: 8,
          color: 'gray.base',
          thickness: '5px',
        },
        {
          size: '2rem',
          p: 3,
          bg: 'white',
        },
      ]}
    >
      <Close />
    </States>
  </Specimen>
));
