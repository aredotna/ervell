import React from 'react';
import { storiesOf } from '@storybook/react';

import LoggedOutCTA from 'react/components/LoggedOutCTA';

storiesOf('LoggedOutCTA', module)
  .add('channel', () => (
    <LoggedOutCTA subject={{
      __typename: 'User',
      name: 'Thomas Anderson',
      }}
    />
  ));
