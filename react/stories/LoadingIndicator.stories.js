import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';

storiesOf('LoadingIndicator', module)
  .add('default', () => (
    <Specimen>
      <LoadingIndicator />
    </Specimen>
  ));
