import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import MentionTextarea from 'react/components/UI/MentionTextarea';

storiesOf('MentionTextarea', module)
  .add('default', () => (
    <Specimen>
      <MentionTextarea />
    </Specimen>
  ));
