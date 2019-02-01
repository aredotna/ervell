import React from 'react';
import { storiesOf } from '@storybook/react';

import TopBar from 'react/components/TopBar';

storiesOf('TopBar', module)
  .add('logged in', () => (
    <TopBar
      serializedMe={{ id: 1, initials: 'CB' }}
      border="1px dotted black"
    />
  ))
  .add('logged in (group context)', () => (
    <TopBar
      scheme="GROUP"
      serializedMe={{ id: 1, initials: 'CB' }}
    />
  ))
  .add('logged out', () => (
    <TopBar border="1px dotted black" />
  ));
