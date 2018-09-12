import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import NotificationsDropdown from 'react/components/NotificationsDropdown';

storiesOf('NotificationsDropdown', module)
  .add('default', () => (
    <Specimen>
      <NotificationsDropdown />
    </Specimen>
  ));
