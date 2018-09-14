import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Notifications from 'react/components/NotificationsDropdown/components/Notifications';
import NotificationsDropdown from 'react/components/NotificationsDropdown';

storiesOf('NotificationsDropdown', module)
  .add('default', () => (
    <Specimen>
      <NotificationsDropdown />
    </Specimen>
  ))
  .add('empty', () => (
    <Specimen>
      <Notifications notifications={[]} />
    </Specimen>
  ));
