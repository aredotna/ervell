import React from 'react';
import { storiesOf } from '@storybook/react';

import TopBar from 'react/components/TopBar';

storiesOf('TopBar', module)
  .add('logged out', () => (
    <TopBar />
  ));
