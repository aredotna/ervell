import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';
import MentionTextarea from 'v2/components/UI/MentionTextarea';

storiesOf('MentionTextarea', module).add('default', () => (
  <Specimen>
    <MentionTextarea />
  </Specimen>
));
