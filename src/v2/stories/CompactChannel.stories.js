import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';
import CompactChannel from 'v2/components/CompactChannel';

storiesOf('CompactChannel', module).add('default', () => (
  <Specimen>
    <CompactChannel
      channel={{
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
