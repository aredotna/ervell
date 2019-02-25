import React from 'react';
import { storiesOf } from '@storybook/react';

import States from 'react/stories/__components__/States';
import Specimen from 'react/stories/__components__/Specimen';

import Close from 'react/components/UI/Close';

storiesOf('Close', module)
  .add('default', () => (
    <Specimen>
      <States
        bg="gray.medium"
        states={[
          { size: 6 },
          {
            size: 6,
            color: 'white',
            thickness: '4px',
          },
          {
            size: 8,
            color: 'gray.base',
            thickness: '5px',
          },
        ]}
      >
        <Close />
      </States>
    </Specimen>
  ));
