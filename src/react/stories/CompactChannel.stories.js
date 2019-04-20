import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import CompactChannel from 'react/components/CompactChannel';

storiesOf('CompactChannel', module)
  .add('default', () => (
    <Specimen>
      <CompactChannel channel={{
        title: 'Genesis',
        owner: {
          name: 'Thomas Anderson',
        },
        counts: {
          contents: 42,
        },
        visibility: 'private',
      }}
      />
    </Specimen>
  ));
