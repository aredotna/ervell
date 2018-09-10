import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import UserDropdown from 'react/components/UserDropdown';

storiesOf('UserDropdown', module)
  .add('default', () => (
    <Specimen>
      <UserDropdown />
    </Specimen>
  ));
