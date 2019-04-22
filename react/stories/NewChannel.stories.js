import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';

import NewChannelForm from 'react/components/NewChannelForm';

storiesOf('NewChannelForm', module)
  .add('default', () => (
    <Specimen>
      <NewChannelForm />
    </Specimen>
  ));
