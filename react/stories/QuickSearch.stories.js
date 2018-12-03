import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import QuickSearch from 'react/components/QuickSearch';

storiesOf('QuickSearch', module)
  .add('default', () => (
    <Specimen>
      <QuickSearch />
    </Specimen>
  ));
