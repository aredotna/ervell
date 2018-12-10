import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import LoggedInTopBar from 'react/components/LoggedInTopBar';

storiesOf('Logged-in TopBar', module)
  .add('default', () => (
    <Specimen>
      <LoggedInTopBar />
    </Specimen>
  ));
