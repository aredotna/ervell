import React from 'react';
import { storiesOf } from '@storybook/react';

import MuteButton from 'react/components/MuteButton';

storiesOf('MuteButton', module)
  .add('default', () => (
    <MuteButton id={666} type="BLOCK" />
  ));
