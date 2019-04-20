import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';
import UserDropdown from 'v2/components/UserDropdown';

storiesOf('UserDropdown', module).add('default', () => (
  <Specimen>
    <UserDropdown />
  </Specimen>
));
