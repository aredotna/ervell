import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Feed from 'react/components/Feed';

storiesOf('Feed', module)
  .add('default', () => (
    <Specimen>
      <Feed />
    </Specimen>
  ));
